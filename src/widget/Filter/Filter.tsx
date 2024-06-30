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
    onChange: (params: { genre?: string; release_year?: string }) => void;
};
const GENRES = {
    '0': 'Не выбран',
    comedy: 'Комедия',
    drama: 'Драма',
    action: 'Боевик',
    thriller: 'Триллер',
    horror: 'Ужасы',
    family: 'Семейный',
    cartoon: 'Анимированный',
    fantasy: 'Фэнтези',
    romance: 'Романтика',
    adventure: 'Приключения',
    musical: 'Мьюзикл',
    war: 'Военный',
}

const YEARS = {
    '0': 'Не выбран',
    '2009': '2009',
    '2008': '2008',
    '2007': '2007',
    '2006': '2006',
    '1990-2005': '1990-2005',
    '1950-1989': '1950-1989',
}


const Filter:React.FC<FilterProps> = ({onChange}) => {



    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();

    const [selectedGenre, setSelectedGenre] = useState<string | null>(searchParams.get("genre"));
    const [selectedYear, setSelectedYear] = useState<string | null>(searchParams.get("release_year"));


    const genresOptions: Genre[] = Object.entries(GENRES).map(([value, label]) => ({
        value: value as keyof typeof GENRES_MAP,
        label: label as typeof GENRES_MAP[keyof typeof GENRES_MAP],
    }));

    const yearOptions = Object.entries(YEARS).map(([value, label]) => ({
        value: value as keyof typeof YEARS,
        label: label as typeof YEARS[keyof typeof YEARS],
    }));

    useEffect(() => {
        const params = new URLSearchParams();
        if (selectedGenre) params.set("genre", selectedGenre);
        if (selectedYear) params.set("release_year", selectedYear);

        navigate({ search: params.toString() });
    }, [selectedGenre, selectedYear, navigate]);

    const handleGenreChange = (genre: string) => {
        setSelectedGenre(genre);
        onChange({ genre });
    };

    const handleYearChange = (release_year: string) => {
        setSelectedYear(release_year);
        onChange({ release_year });
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
                <SelectCustom placeholder="Выберите год" value={null} options={yearOptions} onChange={(value) => handleYearChange(value)}/>
            </div>

        </div>
    )
}

export default Filter;