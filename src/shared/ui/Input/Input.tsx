import React, { useEffect } from "react";
import styles from "./Input.module.scss"


export interface inputProps {
    placeholder?: string;
    label?: string;
    error?: string;
    isRequired: boolean;
    onChange: ()=>void;
}


const Input: React.FC<inputProps> = ({ label, error, isRequired = false, ...props }) => {
    return (
        <div>
            <label>
                <span>
                    {label}
                    {isRequired && <span style={{ color: 'red' }}>*</span>} {/* Отображаем звездочку, если поле обязательно */}
                </span>

                
                <input className={styles.input} {...props} style={{"borderRadius": "8px",padding: "10px 12px", border:"#E1E3E6 1px solid", color: "#ABABAB", marginTop:"4px", minWidth:"296px"}}/>
            </label>
            <br></br>
            {error && <span style={{ color: 'red' }}>{error}</span>}
        </div>
        

    )

}

export default Input;