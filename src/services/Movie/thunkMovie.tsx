import { createAsyncThunk } from "@reduxjs/toolkit";

import { MovieCardType } from "../../widget/movies/MovieCard/MovieCard";

export const fetchMovies = createAsyncThunk<
    { search_result: MovieCardType[]; total_pages: number },
    QuerySearchParams,
    { rejectValue: string }
>(
    'movie/fetchMovies',
    async (searchParams: QuerySearchParams, { rejectWithValue }) => {
        try {
            const query = new URLSearchParams(searchParams as any).toString();
            let data;
            if (query){
                const response = await fetch(`http://localhost:3030/api/v1/search?${query}`);
                data = await response.json();
            }
            else{
                const response = await fetch(`http://localhost:3030/api/v1/search`);
                data = await response.json();

            }
            return data;
        } catch (err: any) {
            console.log(err.message)
            return rejectWithValue(err.message);
        }
    }
);

export type QuerySearchParams = {
    title?: string;
    release_year?: string;
    genre?: string;
    page?: number;
};