import React, { createContext, useCallback, useEffect, useState } from "react";
import MovieList from "../widget/movies/MovieList/MovieList";
import { QuerySearchParams } from "../services/Movie/apiMovie";
import Filter from "../widget/Filter/Filter";
import Spinner from "../shared/ui/Spinner/Spinner";
import { useLocation, useNavigate } from "react-router-dom";
import debounce from "lodash.debounce";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../services/store";

import { fetchMovies } from "../services/Movie/thunkMovie";
import { setSearchParams } from "../services/Movie/MovieSlice";

const HomePage: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const dispatch: AppDispatch = useDispatch();

    const searchParams = useSelector((state: RootState) => state.movies.search_params);

    useEffect(() => {
        dispatch(fetchMovies(searchParams));
    }, [dispatch, searchParams]);

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const genre = params.get("genre") || undefined;
        const release_year = params.get("release_year") || undefined;
        const title = params.get("title") || undefined;
        const updatedParams: QuerySearchParams = {
            ...(genre && { genre }),
            ...(release_year && { release_year }),
            ...(title && { title }),
        };
        dispatch(setSearchParams({ search_params: updatedParams }));
    }, [location.search]);

    const handleFilterChange = useCallback((newParams: { genre?: string; release_year?: string; title?: string }) => {
        const updatedParams: QuerySearchParams = { ...searchParams, ...newParams };
        dispatch(setSearchParams({ search_params: updatedParams }));

        const params = new URLSearchParams();
        Object.keys(updatedParams).forEach((key) => {
            const value = updatedParams[key as keyof typeof updatedParams];
            if (value) {
                params.set(key, value.toString());
            }
        });

        navigate({ search: params.toString() });
        setCurrentPage(1);
    }, [dispatch, searchParams, navigate]);

    const debouncedHandleSearch = useCallback(
        debounce((title: string) => {
            handleFilterChange({ title });
        }, 300),
        [handleFilterChange]
    );

    const handleSearchChange = (title: string) => {
        debouncedHandleSearch(title);
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const movies = useSelector((state: RootState) => state.movies.search_result);
    const totalPages = useSelector((state: RootState) => state.movies.total_pages);

    const isLoading = useSelector((state: RootState) => state.movies.loading);

    return (

            <div style={{ width: "calc(100% - 50px)", margin: "0 auto", display: "flex", gap: "16px" }} className="container">
                <Filter onChange={handleFilterChange} />
                {!isLoading ?
                    <MovieList cards={movies || []} onChangeInput={handleSearchChange} totalPages={totalPages || 1} onPageChange={handlePageChange} currentPage={currentPage} />
                    : <Spinner />}
            </div>

    );
};

export default HomePage;