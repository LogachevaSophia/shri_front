import React from "react";

import { Modal as ModalAnt } from "antd";
import Button from "../Button/Button";
import ReactDOM from "react-dom";


interface ModalProps {
    open: boolean;
    // onClick?: () => void; // Обработчик клика
    children: React.ReactNode; // Текст или вложенные компоненты
    // className?: string; // Дополнительный класс для стилизации
    onCancel: () => void;
    title: string;
    width: any;
}

const Modal: React.FC<ModalProps> = ({ open, children, title, onCancel, ...props }) => {
    const footer = [
        // <Button key="back" >
        //   Войти
        // </Button>,
        // <Button key="submit" variant={"outlined"} >
        //   Отменить
        // </Button>,
    ]
    return ReactDOM.createPortal(

        <ModalAnt
            title={title}
            open={open}
            onCancel={onCancel}
            footer={null}
            {...props}
        >
            {children}

        </ModalAnt>, document.getElementById('modal-root') as HTMLElement
    )



}

export default Modal;