// src/app/store.ts
import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/user/userSlice';
import api from '../features/auth/api';

export const store = configureStore({
    reducer: {
        user: userReducer,
        [api.reducerPath]: api.reducer,
      },
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(api.middleware),
});

// Типизация корневого состояния и диспетчера
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
