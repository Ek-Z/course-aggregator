//Переиспользуемая форма для регистрации и авторизации
import React from "react";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import PropTypes from 'prop-types';
import { Button, Input } from '@mui/material';
import { Error } from "../Error/Error";
import { ProgressLoader } from "../ProgressLoader/ProgressLoader";
import { selectSessionError, selectSessionPending } from "../../store/session/selectors";
import { clearError } from "../../store/session";
import styles from "./AuthForm.module.scss"

export function AuthForm({title, button, onChange, onSubmit, user, error}) {
    const pending = useSelector(selectSessionPending)
    const sessionError = useSelector(selectSessionError)
    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch(clearError())
    },[])

    return (
        <form className={`${styles.loginForm} container`} onSubmit={onSubmit}>
            <div className={styles.loginForm_block}>
                <h1 className={styles.loginForm_block_title}>{title}</h1>
                {error.name && <Error textError={error.name}/>}
                {(title==="Регистрация") &&
                <Input
                    name="name"
                    value={user.name}
                    onChange={onChange}
                    fullWidth={true}
                    placeholder="Ваше имя"
                    className={styles.loginForm_block_input}
                    type="more"
                />
                }
                {error.email && <Error textError={error.email}/>}
                <Input
                    name="email"
                    value={user.email}
                    onChange={onChange}
                    fullWidth={true}
                    placeholder="Ваш email"
                    className={styles.loginForm_block_input}
                    type="email"
                />
                {error.password && <Error textError={error.password}/>}
                <Input
                    name="password"
                    value={user.password}
                    onChange={onChange}
                    fullWidth={true}
                    placeholder="Ваш пароль"
                    type="password"
                    className={styles.loginForm_block_input}
                />
                {error.confirm_password && <Error textError={error.confirm_password}/>}
                {(title === "Регистрация") &&
                <Input
                    name="confirm_password"
                    value={user.confirm_password}
                    onChange={onChange}
                    fullWidth={true}
                    placeholder="Повторите пароль"
                    type="password"
                    className={styles.loginForm_block_input}
                />}
                <Button type="submit" color="secondary" variant="contained"
                        className={styles.loginForm_block_btn}
                >{button}</Button>
                {(title==="Авторизация") &&
                <Link className={styles.loginForm_link} to="/signUp">У вас нет аккаунта? Зарегистрируйтесь</Link>
                }
                {(title==="Регистрация") &&
                <Link className={styles.loginForm_link} to="/signIn">У вас уже есть аккаунт? Войдите</Link>
                }
                {pending ? <ProgressLoader/> : <div className={styles.loginForm_status}>#</div> }
                {sessionError!==null ? <p className={styles.loginForm_status}>Ошибка! Возможно введено что-то не так или проблема на сервере...</p> : <p className={styles.loginForm_status}>#</p>}
                    </div>
        </form>
    )
}

AuthForm.propTypes = {
    title: PropTypes.string,
    button: PropTypes.string,
    onChange: PropTypes.func,
    onSubmit: PropTypes.func,
    user: PropTypes.object,
    error: PropTypes.object,
}
