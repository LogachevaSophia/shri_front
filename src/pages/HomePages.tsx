import React, { useEffect } from "react"
// import { MovieCardType } from "../widget/movies/MovieCard/MovieCard";
import MovieList from "../widget/movies/MovieList/MovieList";
import { useGetSearchResultsQuery } from "../features/MovieList/api";
import SelectCustom from "../shared/ui/Select/Select";
import Filter from "../widget/Filter/Filter";
import Spiner from "../shared/ui/Spinner/Spinner";


const HomePage: React.FC = () => {



    const { data, error, isLoading } = useGetSearchResultsQuery({});
    useEffect(() => {
        console.log(data)
    }, [data])

    return (
        <div style={{ width: "calc( 100% - 50px)", margin: "0 auto", display: "flex", gap:"16px" }} className="container">
            <Filter/>
            {!isLoading && <MovieList cards={data?.search_result || []} />}
            {isLoading && <Spiner/>}
            
        </div>
    )

}

export default HomePage;