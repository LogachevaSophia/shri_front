import React, { useCallback, useEffect, useState } from "react";
import MovieList from "../widget/movies/MovieList/MovieList";
import { QuerySearchParams, useGetSearchResultsQuery } from "../features/MovieList/api";
import SelectCustom from "../shared/ui/Select/Select";
import Filter from "../widget/Filter/Filter";
import Spinner from "../shared/ui/Spinner/Spinner";
import { useLocation, useNavigate } from "react-router-dom";
import debounce from "lodash.debounce";

const HomePage: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useState<QuerySearchParams>({});
    const [currentPage, setCurrentPage] = useState(1);

    const { data, error, isLoading, isFetching } = useGetSearchResultsQuery({
        ...searchParams,
        page: currentPage,
    });

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
        setSearchParams(updatedParams);
    }, [location.search]);

    const handleFilterChange = useCallback((newParams: { genre?: string; release_year?: string; title?: string }) => {
        const updatedParams = { ...searchParams, ...newParams };
        setSearchParams(updatedParams);

        // Преобразуем объект updatedParams в URLSearchParams
        const params = new URLSearchParams();
        Object.keys(updatedParams).forEach((key) => {
            const value = updatedParams[key as keyof typeof updatedParams]; // Явное указание типа для значения
            if (value) {
                params.set(key, value as keyof typeof updatedParams);
            }
        });
        console.log(params.toString())

        navigate({ search: params.toString() });
        setCurrentPage(1);
    }, [searchParams, navigate]);

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
        console.log("page", page)
        setCurrentPage(page);
    };
    return (
        <div style={{ width: "calc( 100% - 50px)", margin: "0 auto", display: "flex", gap: "16px" }} className="container">
            <Filter onChange={handleFilterChange} />
            {!isLoading && !isFetching ?
                <MovieList cards={data?.search_result || []} onChangeInput={handleSearchChange} totalPages={data?.total_pages || 1} onPageChange={handlePageChange} currentPage={currentPage} />
                : <Spinner />}

        </div>
    );
};

export default HomePage;
