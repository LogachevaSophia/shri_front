import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from "../pages/HomePages";
import FilmPage from "../pages/FilmPage";

const Router: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage/>} />
                <Route path="/movie/:id" element={<FilmPage/>}/>
            </Routes>
        </BrowserRouter>
    )

}

export default Router;