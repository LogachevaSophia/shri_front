import React, { useState, useEffect } from "react";
import styles from "./MovieCard.module.scss";
import { useSelector } from "react-redux";
import { RootState } from "../../../../services/store";
import Rating from "../../../Rating/Rating";
import { MovieCardType } from "../MovieCard";
import CustomCarousel from "../../../../shared/ui/Carousel/Carouse";
export type actor = {
    name: string,
    photo: string
}

const BigMovieCard: React.FC<MovieCardType> = ({ poster, title, genre, release_year, description, rating, id, actors }) => {
    const isAuthenticated = useSelector((state: RootState) => state.user.isAuthenticated);
    const [selectedRating, setSelectedRating] = useState<number>(() => {
        const storedRating = localStorage.getItem(`selectedRating-${id}`);
        return storedRating ? parseFloat(storedRating) : parseFloat(rating);
    });

    useEffect(() => {
        const storedRating = localStorage.getItem(`selectedRating-${id}`);
        setSelectedRating(storedRating ? parseFloat(storedRating) : parseFloat(rating));
    }, [rating, id]);

    const handleChangeRating = (newRating: number) => {
        setSelectedRating(newRating);
    };

    useEffect(() => {
        localStorage.setItem(`selectedRating-${id}`, selectedRating.toString());
    }, [selectedRating, id]);

    return (
        <div className={styles.card}>
            <img src={poster} alt={title} className={styles.img} />
            <div style={{ width: "100%" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
                    <h1>{title}</h1>
                    {isAuthenticated && (
                        <div className={styles.score}>
                            <Rating rating={selectedRating} onChange={handleChangeRating} />
                        </div>
                    )}
                </div>
                <div className={styles.container_description}>
                    <span><b>Жанр: </b>{genre}</span>
                    <span><b>Год выпуска: </b>{release_year}</span>
                    <span><b>Рейтинг: </b>{rating}</span>
                    <label ><b>Описание: </b>{description}</label>
                </div>
                {/* <CustomCarousel dots={false} infinite={false} slidesToShow={Math.min(actors.length , 4)} slidesToScroll={1} arrows style={{backgroundColor:"grey", maxWidth: "calc( 100% - 500px)" }}  className={styles.custom}>
                    {actors?.map((actor, index) => (
                        <div className={styles.card_actor} key={index}>
                            <img src={actor.photo} alt={actor.name} />
                            <span>{actor.name}</span>
                        </div>
                    ))}
                </CustomCarousel> */}
                
            </div>
        </div>
    );
};

export default BigMovieCard;
