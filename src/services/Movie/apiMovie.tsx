import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {MovieCardType} from "../../widget/movies/MovieCard/MovieCard"

import { baseQuery } from './fetchBaseQuery';

type QueryResultType = {
  search_result: MovieCardType[],
  total_pages: number
}

export type QuerySearchParams = {
  title?:string,
  release_year?: string,
  genre?:string,
  page?: number
}


type MovieParams = {
  id: string
}




const baseQueryWithErrorHandling = async (args: any, api: any, extraOptions: any) => {
  let result = await baseQuery(args, api, extraOptions);
  console.log(result)
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


export const searchApi = createApi({
  reducerPath: 'searchApi',
  baseQuery: baseQueryWithErrorHandling,
  endpoints: (builder) => ({
    getMovieById: builder.query<MovieCardType, MovieParams>({
      query: ({id}) => `movie/${id}`,
    }),
  }),
});

export const { useGetMovieByIdQuery } = searchApi;