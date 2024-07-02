import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { selectToken } from "../user/userSlice";
import { RootState } from "../store";

export const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:3030/api/v1',
    prepareHeaders: (headers, { getState }) => {
      const state = getState() as RootState;
      const token = selectToken(state); // Используем селектор для получения токена из стейта
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      } else {
        if (localStorage.getItem("token")) {
          headers.set('Authorization', `Bearer ${localStorage.getItem("token")}`);
        }
      }
      headers.set('Content-Type', 'application/json');
      return headers;
    },
  });