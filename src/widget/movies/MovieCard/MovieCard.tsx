import React from "react";
import styles from "./MovieCard.module.scss"
import Rating from "../../Rating/Rating";


export type MovieCardType = {
    id: number,
    poster: string,
    title: string,
    genre: string,
    release_year: number,
    description: string,
    rating: number,
    children: React.ReactNode;

}

const MovieCard: React.FC<MovieCardType> = ({ poster, title, genre, release_year, description, rating, children }) => {




    return (
        <div className={styles.card}>
            <img src={poster} className={styles.img}>
            </img>
            <div className={styles.container_description}>
                <div>
                    <div>
                        <h1>{title}</h1>
                    </div>
                    <table>
                        <tbody>
                            <tr>
                                <th className={styles.disable}>
                                    Жанр
                                </th>
                                <th>
                                    {genre}
                                </th>
                            </tr>
                            <tr>
                                <th className={styles.disable}>
                                    Год выпуска
                                </th>
                                <th>
                                    {release_year}
                                </th>
                            </tr>
                            <tr>
                                <th className={styles.disable}>
                                    Описание
                                </th>
                                <th>
                                    {description}
                                </th>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className={styles.score}>
                    <Rating rating={3}/>
                </div>

            </div>


        </div>
    )

}

export default MovieCard;