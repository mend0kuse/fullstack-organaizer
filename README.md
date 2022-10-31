# Fullstack organaizer

Приложение для организации личных дел

## Функционал

- Календарь с возможностью добавить событие на определенный день
- Канбан-проекты
- Личный кабинет(пока только с аватаркой)
- остальное в разработке

## Планирую сделать

- Список целей
- Возможность приглашать других пользователей в проект(возможно чат)

## Стек технологий

**Client:** Typescript,React/Redux Toolkit/RTK Query/React Transition Group(немного),SCSS

**Server:** Node, Express, MongoDB


## Запустить проект локально

Запуск клиент+сервер 

```bash
  cd client
  npm install
  cd ..
  npm install
  npm run dev
```

Запуск только клиентской части

```bash
  cd client
  npm install
  npm start
```
Запуск только сервера

```bash
  npm install
  npm run server
```


## Логика для авторизованного/неавторизованного пользователя

- Авторизация работает только при запущенном сервере и наличии монго на пк(в скором времени подниму удаленную)
- У авторизованно пользователя все сохраняется в базу данных(запросы реализованы черет RTK Query)
- у неавторизованно пользователя сохраняется в Redux,при обновлении страницы сбрасывается(при переключении между страницами сохраняется)


