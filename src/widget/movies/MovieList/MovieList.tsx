import React, { useEffect } from "react"
import MovieCard, { MovieCardType } from "../MovieCard/MovieCard"
import SearchInput from "../../../shared/ui/SearchInput/SearchInput"
import Pagination from "../../../features/Pagination/Pagination"

export type List = {
    cards: MovieCardType[],
    onChangeInput: (title: string) => void,
    currentPage: number, 
    totalPages: number, 
    onPageChange: (page: number) => void
}
const MovieList: React.FC<List> = ({ cards, onChangeInput,currentPage, totalPages, onPageChange}) => {
    

    return (
        <div>
            <SearchInput placeholder="Поиск..." onChange={onChangeInput}/>
            {cards.map(el => <MovieCard {...el} key={el?.id}/>)}
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />
        </div>
    )
}

export default MovieList;