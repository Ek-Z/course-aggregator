import React from "react";
import style from './Error.module.scss';
export const Error = ({textError}) => {
    return(
        <>
            <div className={style.Error}>{textError}</div>
        </>
    )
}
