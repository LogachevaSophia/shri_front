import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { selectToken, setToken } from '../user/userSlice'; // Используем селектор для получения токена из стейта
import { RootState } from '../store';
import { baseQuery } from '../Movie/fetchBaseQuery';



export const baseQueryWithErrorHandling = async (args: any, api: any, extraOptions: any) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error) {
    // Обрабатываем ошибки здесь
    let errorMessage = 'An unknown error occurred';

    if (result.error.status === 400) {
      errorMessage = 'Bad Request';
    } else if (result.error.status === 401) {
      errorMessage = 'Unauthorized';
    } else if (result.error.status === 403) {
      errorMessage = 'Forbidden';
    } else if (result.error.status === 404) {
      errorMessage = 'Not Found';
    } else if (result.error.status === 500) {
      errorMessage = 'Internal Server Error';
    }
    const error_result = {error: {
      status: result.error.status,
      message: errorMessage,
      data: result.error.data,
    },}
    console.log(error_result)

    return error_result
  }

  return result;
};

const api = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithErrorHandling,
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: '/login',
        method: 'POST',
        body: credentials,
      }),
    }),
  }),
});

export const { useLoginMutation } = api;

export default api;

