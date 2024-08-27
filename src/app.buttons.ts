import { Markup } from 'telegraf';

export const actionButtons = Markup.keyboard(
  [Markup.button.callback('Регистрация', 'register'), Markup.button.callback('Инфа о пользователях', 'users')],
  {
    columns: 2,
  },
);
