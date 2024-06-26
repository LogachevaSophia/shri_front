import React, { useEffect, useState } from "react";
import styles from "./Header.module.scss"
import Button from "../Button/Button";
import Modal from "../Modal/Modal";
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../../../app/store';
import Login from "../../../features/auth/login";
import { logout, setToken } from "../../../features/user/userSlice";



const Header: React.FC = () => {


    //Работа со стэйт менеджером
    
    const isAuthenticated = useSelector((state: RootState) => state.user.isAuthenticated);

   


    const [open, setOpen] = useState<boolean>(false)
    const dispatch = useDispatch();
    useEffect(()=>{
        if (localStorage.getItem("token")){
            dispatch(setToken(localStorage.getItem("token")))
        }
    },[localStorage.getItem("token")])
    
    

    return (
        <header className={styles.header}>
            <div className={styles.title}>Фильмопоиск</div>
            {/* <Button variant="fullfied" onClick={() => setOpen(true)}>
                Войти
            </Button> */}
            {isAuthenticated && <Button variant="outlined" onClick={() => dispatch(logout())}>
                Выйти
            </Button>}
            {!isAuthenticated && <Button variant="fullfied" onClick={() => {console.log("HII");setOpen(true)}}>
                Войти
            </Button>}

            <Modal
                open={open}
                onCancel={() => setOpen(false)}
                title={"Авторизация"}
                width="min-content">
                    <Login close={() =>setOpen(false)}/>
                
            </Modal>

        </header>
    )


}

export default Header;
export { };