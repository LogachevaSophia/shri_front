import React, { useEffect } from "react"
import MovieCard, { MovieCardType } from "../MovieCard/MovieCard"
import SearchInput from "../../../shared/ui/SearchInput/SearchInput"

export type List = {
    cards: MovieCardType[]
}
const MovieList: React.FC<List> = ({ cards }) => {
    

    return (
        <div>
            <SearchInput placeholder="Поиск..."/>
            {cards.map(el => <MovieCard {...el} key={el?.id}/>)}
        </div>
    )
}

export default MovieList;