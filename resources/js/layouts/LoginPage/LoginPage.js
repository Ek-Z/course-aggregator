// Страница регистрации

import {LoginForm} from "../../components/LoginForm/LoginForm";
import React, {useState} from "react";
import axios from "axios";
import {useHistory} from "react-router";

export const LoginPage = () => {
    const [user, setUser] = useState({
        email: "",
        password:""
    });

    let history = useHistory();

    const {email,password} = user;

    const onInputChange = e => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const signIn = async (e) => {
        e.preventDefault();
        if(user.email === '') {
            alert('Не введен email')
        }
        else if(user.password === '') {
            alert('Не ввведен пароль')
        }
        try {
            let response = await axios.post("api/login",user);
            localStorage.setItem("users",response.data);
            alert("Приветствуем тебя, "+ response.data.data.name);
            history.push("/");//редирект на главную страницу
        }
        catch (e) {
            console.log(`Error! ${e}`)
        }
    }
    return (
        <LoginForm
            title="Авторизация"
            button="Войти"
            onChange={onInputChange}
            onSubmit={signIn}
            email={email}
            password={password}
        />
    )
}
