import React from "react";
import styles from "./Filter.module.scss"
import SelectCustom from "../../shared/ui/Select/Select";
import Search from "../../shared/ui/SearchInput/Search";

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


const Filter = () => {
    const genresOptions: Genre[] = Object.entries(GENRES_MAP).map(([value, label]) => ({
        value: value as keyof typeof GENRES_MAP,
        label: label as typeof GENRES_MAP[keyof typeof GENRES_MAP],
    }));
    return (
        <div className={styles["container_filter"]}>

            {/* <Search /> */}
            <h1>
                Фильтр
            </h1>
            <div className={styles["container_select"]}>
                <label htmlFor="">Жанр</label>
                <SelectCustom placeholder="Выберите жанр" options={genresOptions} />
            </div>
            <div className={styles["container_select"]}>
                <label htmlFor="">Год выпуска</label>
                <SelectCustom placeholder="Выберите год" options={[
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