import { Action, Command, Ctx, Hears, InjectBot, Start, Update } from 'nestjs-telegraf';
import { Format, Markup, Telegraf } from 'telegraf';
import { Context } from 'src/user/user.controller';
import { UserService } from './user.service';
import { IUser } from 'src/types';
import { actionButtons } from 'src/app.buttons';
import { UserEntity } from './entities/user.entity';

@Update()
export class UserBot {
  constructor(
    @InjectBot() private readonly bot: Telegraf<Context>,
    private readonly userService: UserService,
  ) {}

  _getUserFromContext(ctx: Context): IUser {
    return ctx?.message?.from || ctx?.update?.callback_query?.from;
  }

  @Start()
  async start(@Ctx() ctx: Context) {
    ctx.sendMessage('Привет жми кнопку', actionButtons);
  }

  async checkIsRegister(userId: number) {
    return Boolean(await this.userService.findById(userId)) === false;
  }

  getUserName(user: Partial<UserEntity>) {
    if (user?.username && user.username !== 'unknown') return user.username;
    if (user?.first_name && user.first_name !== 'unknown') return user.first_name;
    if (user?.last_name && user.last_name !== 'unknown') return user.last_name;
  }

  @Hears('Регистрация')
  async onRegister(@Ctx() ctx: Context) {
    const userData = this._getUserFromContext(ctx);

    let resText = this.getUserName(userData);

    if (await this.checkIsRegister(userData?.id)) {
      const user = await this.userService.create(userData);
      resText += user ? ' привет' : ' - произошла ошибка';
    } else resText += ' уже зареган';

    ctx.sendMessage(resText);
  }

  @Hears('Инфа о пользователях')
  async getAllUsers(@Ctx() ctx: Context) {
    const userData = this._getUserFromContext(ctx);
    if (await this.checkIsRegister(userData?.id)) {
      ctx.sendMessage('Вы не зареганы, жмите кнопку Регистрация');
      return;
    }
    const users = await this.userService.getAll();
    ctx.sendMessage(
      users.map((user) => `${this.getUserName(user)} (дата регистрации ${new Date(user.createdAt).toLocaleString()})`).join('\n'),
    );
  }
}
