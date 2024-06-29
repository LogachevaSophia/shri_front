import React, { useEffect } from "react"
import MovieCard, { MovieCardType } from "../MovieCard/MovieCard"
import SearchInput from "../../../shared/ui/SearchInput/SearchInput"
import Pagination from "../../../features/Pagination/Pagination"
import { useNavigate } from "react-router-dom"

export type List = {
    cards: MovieCardType[],
    onChangeInput: (title: string) => void,
    currentPage: number, 
    totalPages: number, 
    onPageChange: (page: number) => void
}
const MovieList: React.FC<List> = ({ cards, onChangeInput,currentPage, totalPages, onPageChange}) => {
    const navigate = useNavigate();

    return (
        <div>
            <SearchInput placeholder="Поиск..." onChange={onChangeInput}/>
            {cards.map(el => <MovieCard {...el} key={el?.id} onClick={()=> navigate(`movie/${el?.id}`)}/>)}
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />
        </div>
    )
}

export default MovieList;