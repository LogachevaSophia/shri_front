import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from "../pages/HomePages";

const Router: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/home" element={<HomePage/>} />
            </Routes>
        </BrowserRouter>
    )

}

export default Router;