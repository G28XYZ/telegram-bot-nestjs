import { Action, Command, Ctx, Hears, InjectBot, Start, Update } from 'nestjs-telegraf';
import { Format, Markup, Telegraf } from 'telegraf';
import { Context } from 'src/user/user.controller';
import { UserService } from './user.service';
import { IUser } from 'src/types';
import { actionButtons } from 'src/app.buttons';

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
    const userData = this._getUserFromContext(ctx);
    console.log(userData);
    console.log(await this.userService.getAll());
    ctx.sendMessage('Привет жми кнопку', actionButtons);
  }

  @Hears('Регистрация')
  async onRegister(@Ctx() ctx: Context) {
    const userData = this._getUserFromContext(ctx);

    let resText = userData.username;

    if(Boolean(await this.userService.findById(userData?.id)) === false) {
      const user = await this.userService.create(userData);
      resText += user ? ' привет' : ' - произошла ошибка'
    } else (resText += ' уже зареган')

    ctx.sendMessage(resText);

  }

  @Hears('Инфа о пользователях')
  async getAllUsers(@Ctx() ctx: Context) {
    const userData = this._getUserFromContext(ctx);
    console.log(userData);
    const users = await this.userService.getAll();
    ctx.sendMessage(JSON.stringify(users));
  }

}
