import { Action, Ctx, Hears, InjectBot, Start, Update } from 'nestjs-telegraf';
import { Format, Markup, Telegraf } from 'telegraf';
import { Context } from 'src/user/user.controller';
import { UserService } from './user.service';
import { IUser } from 'src/types';
import { actionButtons, timeButtons } from 'src/app.buttons';

@Update()
export class UserBot {
  constructor(
    @InjectBot() private readonly bot: Telegraf<Context>,
    private readonly userService: UserService,
  ) {}

  _getUserFromContext(ctx: Context): IUser {
    return ctx?.message?.from || ctx?.update?.callback_query?.from;
  }

  sendUserFormInfo(ctx: Context, messages: Record<string, string>, optionalMessage?: string) {
    if (optionalMessage) {
      ctx.sendMessage(optionalMessage);
    }
    setTimeout(() => {
      if (messages.first_name.length) {
        ctx.sendMessage(messages.first_name);
        return;
      }
      if (messages.last_name.length) {
        ctx.sendMessage(messages.last_name);
        return;
      }
    }, 500);
  }

  @Start()
  async start(@Ctx() ctx: Context, isAgreePolitic: boolean = false) {
    const userData = this._getUserFromContext(ctx);
    console.log(userData);
    ctx.sendMessage('Hello');
  }
}
