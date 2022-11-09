# Fullstack organaizer

Приложение для организации личных дел

## Функционал

- Календарь с возможностью добавить событие на определенный день
![App Screenshot](https://sun9-east.userapi.com/sun9-26/s/v1/ig2/Tj7fYgggytEeMU34br9oLm1NaTrE5av-Na4OfxLG7W5DIkepxS1RUT7SuykrhO0AIyI20abyxpBjFpWTwwSZvzPI.jpg?size=1919x903&quality=96&type=album)
![App Screenshot](https://sun9-east.userapi.com/sun9-73/s/v1/ig2/QXZhTZR5OreMUmLyiQvZp8bU1Z8hFD0LQLrKufO2AGFw3p6VUVySCl3XpTQAXbZQ5yx3zD5S7GF-A5umMX7DyCZB.jpg?size=1919x904&quality=96&type=album)
- Канбан-проекты
![App Screenshot](https://sun9-north.userapi.com/sun9-85/s/v1/ig2/fypsoqdG1XjTEtnAW5AI0qDiLWKwcBOenC8vFyp3YvsfaLAyWNu3sJrqaJr2shw8yqKW6jYT9jap7suN-HCTWjjR.jpg?size=1917x900&quality=96&type=album)
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



