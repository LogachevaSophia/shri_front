import { PayloadAction, configureStore, createSlice } from '@reduxjs/toolkit';
import { MovieCardType } from "../../widget/movies/MovieCard/MovieCard"
import { fetchMovies } from './thunkMovie';
import { QuerySearchParams } from './apiMovie';

type MoviesState = {
    search_result: MovieCardType[];
    total_pages: number;
    loading: boolean;
    error: string | null | undefined,
    search_params: QuerySearchParams,
  };
  
  const initialState: MoviesState = {
    search_result: [],
    total_pages: 0,
    loading: false,
    error: null,
    search_params: {}
    
  };


const MovieSlice = createSlice({
    name: "movie",
    initialState: initialState,
    reducers: {
        setMovies(state, action: PayloadAction<{ search_result: MovieCardType[]; total_pages: number }>) {
            state.search_result = action.payload.search_result;
            state.total_pages = action.payload.total_pages;
          },
        setSearchParams(state, action: PayloadAction<{ search_params: QuerySearchParams}> ){
          if (action.payload) {
            state.search_params = action.payload.search_params;
          }
        }
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchMovies.pending, (state)=>{
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchMovies.fulfilled, (state, action: PayloadAction<{ search_result: MovieCardType[], total_pages: number }>) => {
          state.loading = false; 
          state.search_result = action.payload.search_result;
          state.total_pages = action.payload.total_pages;
        })
        .addCase(fetchMovies.rejected, (state, action: PayloadAction<string | undefined, string, { arg: QuerySearchParams; requestId: string; aborted: boolean; condition: boolean }>) => {
          state.loading = false;
          state.error = action.payload;
        })
    }

})

export const { setMovies,setSearchParams } = MovieSlice.actions;
export default MovieSlice.reducer;