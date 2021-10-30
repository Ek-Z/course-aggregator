// Страница авторизации

import React, {useState} from "react";
import axios from "axios";
import {useHistory} from "react-router";
import {LoginForm} from "../../components/LoginForm/LoginForm";

//валидация пароля
const validate = (password) => {
    let regexp = /[0-9a-zA-Z!@#$%^&*]{8,}/g;
    return regexp.test(password)
}

export const RegistrationPage = () => {
    const [user, setUser] = useState({
        name:"",
        email:"",
        password:"",
        c_password:"",
    })
    const {name, email, password, c_password} = user;

    const [error,setError] = useState("")
    let history = useHistory();

    const handleInput = (e) => {
        setUser({...user,[e.target.name]:e.target.value })
    }

    const signUp = async (e) =>{
        e.preventDefault();
        if (user.name === ""){
            alert('Не введено имя пользователя')
        }
        else if (user.email === ""){
            alert('Не введен email')
        }
        else if (user.password === ""){
            alert('Не введен пароль')
        }
        else if(!validate(user.password)){
            setError('Пароль должен состоять не менее, чем из 8 следующих символов: 0-9a-zA-Z!@#$%^&*')
        }
        else if (user.c_password === ""){
            alert('Повторно не введен пароль')
        }
        else {
            try {
                await axios.post("api/register",user);
                alert('Данные отправлены');
                history.push("/");//редирект на главную страницу
            }
            catch (e) {
                console.log(`Error! ${e}`)
            }
        }
    }
    return (
        <LoginForm
            title="Регистрация"
            button="Зарегистрироваться"
            onChange={handleInput}
            onSubmit={signUp}
            name={name}
            email={email}
            password={password}
            c_password={c_password}
            error={error}
        />
    )
}
