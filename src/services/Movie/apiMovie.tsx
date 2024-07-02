import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {MovieCardType} from "../../widget/movies/MovieCard/MovieCard"

import { baseQuery } from './fetchBaseQuery';
import { baseQueryWithErrorHandling } from '../auth/api';

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