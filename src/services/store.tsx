// src/app/store.ts
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user/userSlice';
import api from './auth/api';
import { searchApi } from './Movie/apiMovie';
import MovieReducer from './Movie/MovieSlice';

export const store = configureStore({
    reducer: {
        user: userReducer,
        movies: MovieReducer,
        [api.reducerPath]: api.reducer,
        [searchApi.reducerPath]: searchApi.reducer
      },
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(api.middleware, searchApi.middleware),
});

// Типизация корневого состояния и диспетчера
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
