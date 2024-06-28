import React, { useEffect, useState } from "react";
import styles from "./Filter.module.scss"
import SelectCustom from "../../shared/ui/Select/Select";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";

const GENRES_MAP = {
    comedy: "комедия",
    drama: "драма",
    action: "боевик",
    thriller: "триллер",
    horror: "ужасы",
    family: "семейный",
    cartoon: "анимированный",
    fantasy: "фэнтези",
    romance: "романтика",
    adventure: "приключения",
    musical: "мьюзикл",
    war: "военный",
} as const;

type Genre = {
    value: keyof typeof GENRES_MAP,
    label: typeof GENRES_MAP[keyof typeof GENRES_MAP]
};

type FilterProps = {
    onChange: (params: { genre?: string; year?: string }) => void;
};


const Filter:React.FC<FilterProps> = ({onChange}) => {



    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();

    const [selectedGenre, setSelectedGenre] = useState<string | null>(searchParams.get("genre"));
    const [selectedYear, setSelectedYear] = useState<string | null>(searchParams.get("year"));


    const genresOptions: Genre[] = Object.entries(GENRES_MAP).map(([value, label]) => ({
        value: value as keyof typeof GENRES_MAP,
        label: label as typeof GENRES_MAP[keyof typeof GENRES_MAP],
    }));

    useEffect(() => {
        const params = new URLSearchParams();
        if (selectedGenre) params.set("genre", selectedGenre);
        if (selectedYear) params.set("year", selectedYear);

        navigate({ search: params.toString() });
    }, [selectedGenre, selectedYear, navigate]);

    const handleGenreChange = (genre: string) => {
        setSelectedGenre(genre);
        onChange({ genre });
    };

    const handleYearChange = (year: string) => {
        setSelectedYear(year);
        onChange({ year });
    };


    return (
        <div className={styles["container_filter"]}>
            <h1>
                Фильтр
            </h1>
            <div className={styles["container_select"]}>
                <label htmlFor="">Жанр</label>
                <SelectCustom placeholder="Выберите жанр" options={genresOptions} onChange={(value) => handleGenreChange(value)} value={null}/>
            </div>
            <div className={styles["container_select"]}>
                <label htmlFor="">Год выпуска</label>
                <SelectCustom placeholder="Выберите год" value={null} options={[
                    {
                        value: 'jack',
                        label: 'Jack',
                    },
                    {
                        value: 'lucy',
                        label: 'Lucy',
                    },
                    {
                        value: 'tom',
                        label: 'Tom',
                    },
                ]} />
            </div>

        </div>
    )
}

export default Filter;