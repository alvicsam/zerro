Это неофициальный клиент для [Дзен-мани](http://zenmoney.ru/)

## Что внутри?

- Мощные бюджеты на основе конвертов, как в [YNAB](https://www.youneedabudget.com/)
- Восстановление удалённых операций
- Групповые действия с операциями
  - Замена категории
  - Удаление
- Полный бэкап всех данных (пока без восстановления)

## Запуск локально

1. Клонируем репозиторий себе
2. Ставим зависимости `yarn`
3. Запускаем `yarn start` и идём на [http://localhost:3000](http://localhost:3000/)
4. Вы великолепны

## Выкладка на сервер

1. Получаем `Consumer Key` и `Consumer Secret` на [http://developers.zenmoney.ru](http://developers.zenmoney.ru/)
2. Заполняем поля в `/.env`
3. Запускаем `yarn build`

## Полезные ссылки

- [Официальная документация API Дзен-мани](https://github.com/zenmoney/ZenPlugins/wiki/ZenMoney-API)
