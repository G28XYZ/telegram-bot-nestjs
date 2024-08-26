import { Markup } from 'telegraf';

export const actionButtons = Markup.keyboard(
  [
    Markup.button.callback('Данные профиля', 'getMe'),
    Markup.button.callback('О компании', 'about'),
  ],
  {
    columns: 2,
  },
);

export const timeButtons = Markup.inlineKeyboard(
  [
    Markup.button.callback('24 часа', 'time 24'),
    Markup.button.callback('48 часов', 'time 48'),
    Markup.button.callback('72 часа', 'time 72'),
  ],
  {
    columns: 3,
  },
);
