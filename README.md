
# React
## Базовые требования:

- Создан github-репозиторий, в нём есть README, gitignore ✅
- Проект запускается ✅
- Вёрстка соответствует дизайн-макетам (допускаются минимальные отхождения, адаптив не требуется) ✅

## Функциональные требования:
### Шапка:
- Позиционируется липко ✅
### Авторизация
- Для реализации модального окна используется портал
- После успешной авторизации кнопка «Войти» меняется на заглушку иконки пользователя и кнопку «Выйти»; ✅
   - Сохраняем авторизационный токен из ответа ручки бэка /login (например, в localStorage); ✅
   - С токеном стоит работать через thunk; ✅
   - По клику на кнопку «Выйти» удаляем токен и снимаем авторизацию; ✅
   - При инициализации приложения проверяем авторизационный токен; ✅
### Реализована страница списка фильмов:
- Поиск:
   - Поиск происходит во время ввода пользователем символов. Дёргаем ручку `/search`; ✅
- Фильтры:
   - Реализованы фильтры с dropdown; ✅
   - Фильтры сохраняются в query-params; ✅
- Реализован список фильмов с пагинацией; ✅

### Страница фильмов
- Реализована работа с получением данных:
   - Дёргаем ручку /movie:id; ✅
   - Соответствующие данные отрисованы; ✅
- Возможность поставить оценку:
   - Оценку для фильма достаём из ручки /movie/:id; ✅
   - Если пользователь авторизован, даём возможность поставить оценку — запрос мутации; ✅
   - После выставления оценки обновляем кеш запроса /movie/:id;
  
## Общий функционал:

- Реализовать единообразную обработку ошибок для запросов; ✅
- Реализован лоадер; ✅
- Используем debounce для поиска фильма и выставления оценки; ✅


## Стор:

- Используется rtk и rtk-query; ✅
- Данные корректно разбиты на модули (пример — авторизация, searchParams из фильтров ); ✅
- Селекторы написаны оптимально (нет переизбытка дублирования); ✅

## Миграция на Next:

Реализована миграция с использованием SSR; ✅
Для картинок используется Image некста. Скрины фильма, которые вне вьюпорта грузятся лениво;
Фильтры реализованы с помощью сегментов вместо query-параметров.









# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
