// Страница регистрации
import {AuthForm} from "../../components/AuthForm/AuthForm";
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

    //ошибка содержимого инпутов
    const [error,setError] = useState({
        name:"",
        email:"",
        password:"",
        confirm_password:""
    })

    let history = useHistory();

    const onInputChange = e => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const signIn = async (e) => {
        e.preventDefault();
        if(user.email === '') {
            setError({email: 'Поле email не должно быть пустым'});
        }
        else if(user.password === '') {
            setError({password: 'Поле пароля не должно быть пустым'});
        }
        try {
            let response = await axios.post("api/login", user);
            if (response.status === 200) {
                localStorage.setItem("userData", JSON.stringify(response.data));
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
        <AuthForm
            title="Авторизация"
            button="Войти"
            onChange={onInputChange}
            onSubmit={signIn}
            user={user}
            error={error}
        />
    )
}
