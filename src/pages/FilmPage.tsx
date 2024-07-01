import React from "react"
import { useGetMovieByIdQuery } from "../features/MovieList/api";
import { useParams } from "react-router-dom";
import { MovieCardType } from "../widget/movies/MovieCard/MovieCard";
import BigMovieCard from "../widget/movies/MovieCard/BigMovieCard.tsx/BigMovieCard";
import CustomCarousel from "../shared/ui/Carousel/Carouse";
import styles from "../widget/movies/MovieCard/BigMovieCard.tsx/MovieCard.module.scss"



const FilmPage: React.FC = () => {

    const { id } = useParams<{ id: string }>();

    const { data, error, isLoading, isFetching } = useGetMovieByIdQuery(id ? { id } : { id: "0" });
    console.log(data)
    const defaultMovieData: MovieCardType = {
        id: data?.id ?? 0,
        poster: data?.poster ?? 'default-poster.jpg',
        title: data?.title ?? 'No title',
        genre: data?.genre ?? 'Unknown genre',
        release_year: data?.release_year ?? 0,
        description: data?.description ?? 'No description available',
        rating: data?.rating ?? 'N/A',
        actors: data?.actors ?? []
    };
    return (

        <>

            <BigMovieCard {...defaultMovieData} />
            Актёры:
            <CustomCarousel slidesToShow={data?.actors && data?.actors?.length > 5  ? 5 : data?.actors?.length}>
                {data?.actors?.map((actor, index) => (
                    <div className={styles.card_actor} key={index}>
                        <img src={actor.photo} alt={actor.name} />
                        <span>{actor.name}</span>
                    </div>
                ))}
            </CustomCarousel>

        </>)
}

export default FilmPage;