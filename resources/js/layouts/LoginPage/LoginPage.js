// Страница регистрации
import {LoginForm} from "../../components/LoginForm/LoginForm";
import React, {useState} from "react";
import axios from "axios";
import {useHistory} from "react-router";
import {useDispatch} from "react-redux"
import {logIn} from "../../store/session";

export const LoginPage = () => {
    const dispatch = useDispatch();

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
            let response = await axios.post("api/login", user);
            if (response.status === 200) {
                localStorage.setItem("userData", JSON.stringify(response.data));
                console.log("userData:", JSON.parse(localStorage.getItem("userData")));
                alert("Приветствуем Вас, " + response.data.data.name);
                dispatch(logIn(response.data.data));
                history.push("/");//редирект на главную страницу
            } else {
                console.log("Ошибка! ", response)
            }
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
