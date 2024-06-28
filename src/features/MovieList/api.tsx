import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {MovieCardType} from "../../widget/movies/MovieCard/MovieCard"

type QueryResultType = {
  search_result: MovieCardType[],
  total_pages: number
}

type QuerySearchParams = {
  title?:string
}


export const searchApi = createApi({
  reducerPath: 'searchApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3030/api/v1/' }),
  endpoints: (builder) => ({
    getSearchResults: builder.query<QueryResultType, QuerySearchParams>({
      query: () => 'search',
    }),
  }),
});

export const { useGetSearchResultsQuery } = searchApi;