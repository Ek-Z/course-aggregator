// Страница авторизации
import {AuthForm} from "../../components/AuthForm/AuthForm";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {useHistory} from "react-router";
import {useDispatch, useSelector} from "react-redux"
import {logIn} from "../../store/session";
import {registerThunk} from "../../store/session/thunks";
import {selectUserName} from "../../store/session/selectors";

//валидация пароля
const validate = (password) => {
    let regexp = /[0-9a-zA-Z!@#$%^&*]{8,}/g;
    return regexp.test(password)
}

export const RegistrationPage = () => {
    const username = useSelector(selectUserName)

    const [user, setUser] = useState({
        name:"",
        email:"",
        password:"",
        confirm_password:"",
    })
    const dispatch = useDispatch();

    //ошибка содержимого инпутов
    const [error,setError] = useState({
        name:"",
        email:"",
        password:"",
        confirm_password:""
    })

    let history = useHistory();
    useEffect(() => {
        if (username){
            history.push("/")
        }
    },[username])

    const handleInput = (e) => {
        setUser({...user,[e.target.name]:e.target.value })
    }

    const signUp = (e) =>{
        e.preventDefault();
        setError({...error,
            name:"",
            email:"",
            password:"",
            confirm_password:"",
        });
        if (user.name === ""){
            setError({name: 'Поле имени не должно быть пустым'});
        }
        else if (user.email === ""){
            setError({email: 'Поле email не должно быть пустым'});
        }
        else if (user.password === ""){
            setError({password: 'Поле пароля не должно быть пустым'});
        }
        else if(!validate(user.password)){
            setError({password: 'Пароль должен состоять не менее, чем из 8 следующих символов: 0-9a-zA-Z!@#$%^&*'});
        }
        else if (user.confirm_password === ""){
            setError({confirm_password: 'Повторно не введен пароль'});
        }
        else if (user.password !== user.confirm_password){
            setError({...error, confirm_password: 'Пароли не совпадают'})
        }
        else {
            dispatch(registerThunk(user))
        }
    }
    return (
        <AuthForm
            title="Регистрация"
            button="Зарегистрироваться"
            onChange={handleInput}
            onSubmit={signUp}
            user={user}
            error={error}
        />
    )
}
