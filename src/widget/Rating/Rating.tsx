import React, { useCallback, useMemo, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../services/store"
import { fetchMovies } from "../../services/Movie/thunkMovie"
import debounce from "lodash.debounce"

type RatingType = {
    rating: number,
    onChange: (rating: number) => void
    onChangeRated?: () => void
}


const Rating: React.FC<RatingType> = ({ rating, onChange, onChangeRated }) => {
    const maxStars = 5;

    const filledStars = Math.min(rating, maxStars); // Ограничиваем n максимальным числом звезд


    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const dispatch: AppDispatch = useDispatch();
    const searchParams = useSelector((state: RootState) => state.movies.search_params);



    const handleStarHover = (index: number) => {
        setHoveredIndex(index);
    };
    const refetch = useCallback(() => {
        dispatch(fetchMovies(searchParams));
    }, [searchParams, dispatch]);

    const debouncedRefetch = useMemo(() => debounce(refetch, 2000), [refetch]);
    

    const stars = Array.from({ length: maxStars }, (_, index) => {

        return <div style={{ display: "flex", flexDirection: "column", textAlign: "center", cursor: "pointer" }} key={index}>
            <svg onClick={(e) => {
                e.stopPropagation();
                onChange(index + 1);
                debouncedRefetch();
            }} width="16" height="16" viewBox="0 0 16 16"
                xmlns="http://www.w3.org/2000/svg"
                onMouseEnter={() => handleStarHover(index)}
                onMouseLeave={() => setHoveredIndex(null)}>
                <path d="M11.7733 15.1133C11.42 15.1133 10.9667 15 10.4 14.6667L8.40666 13.4867C8.2 13.3667 7.8 13.3667 7.6 13.4867L5.6 14.6667C4.42 15.3667 3.72666 15.0867 3.41333 14.86C3.10666 14.6333 2.62666 14.0533 2.94 12.72L3.41333 10.6733C3.46666 10.46 3.36 10.0933 3.2 9.93334L1.54666 8.28001C0.719997 7.45334 0.786664 6.74667 0.899997 6.40001C1.01333 6.05334 1.37333 5.44 2.52 5.24667L4.64666 4.89334C4.84666 4.86 5.13333 4.64667 5.22 4.46667L6.4 2.11334C6.93333 1.04 7.63333 0.880005 8 0.880005C8.36666 0.880005 9.06666 1.04 9.6 2.11334L10.7733 4.46C10.8667 4.64 11.1533 4.85334 11.3533 4.88667L13.48 5.24001C14.6333 5.43334 14.9933 6.04667 15.1 6.39334C15.2067 6.74001 15.2733 7.44667 14.4533 8.27334L12.8 9.93334C12.64 10.0933 12.54 10.4533 12.5867 10.6733L13.06 12.72C13.3667 14.0533 12.8933 14.6333 12.5867 14.86C12.42 14.98 12.1533 15.1133 11.7733 15.1133Z"
                    fill={hoveredIndex !== null && index <= hoveredIndex ? "#ABABAB" : index < filledStars ? "#FF5500" : "none"}
                    stroke={index >= filledStars ? "#ABABAB" : "none"} />
            </svg>
            <label>{index + 1}</label>
        </div>

    });
    return (
        <div style={{ display: "flex", flexDirection: "row" }}>
            {stars}
        </div>



    )

}

export default Rating