// Страница авторизации
import {AuthForm} from "../../components/AuthForm/AuthForm";
import React, {useState} from "react";
import axios from "axios";
import {useHistory} from "react-router";
import {useDispatch} from "react-redux"
import {logIn} from "../../store/session";

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
    const dispatch = useDispatch();


    const [error,setError] = useState("")//ошибка содержимого пароля
    const [passwordsError, setPasswordsError] = useState("")//ошибка равенства двух введенных паролей

    let history = useHistory();

    const handleInput = (e) => {
        setUser({...user,[e.target.name]:e.target.value })
    }

    const signUp = async (e) =>{
        e.preventDefault();
        setError("");
        setPasswordsError("")
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
        else if (user.password !== user.c_password){
            setPasswordsError('Пароли не совпадают')
        }
        else {
            try {
                let response = await axios.post("api/register",user);
                if(response.status === 200){
                    localStorage.setItem("userData",JSON.stringify(response.data));
                    console.log("userData:", JSON.parse(localStorage.getItem("userData")));
                    alert('Приветствуем Вас, '+ user.name);
                    dispatch(logIn(user.name))
                    history.push("/");//редирект на главную страницу
                } else {
                    console.log("Ошибка! ", response)
                }
            }
            catch (e) {
                console.log(`Error! ${e}`);
                alert('Вероятно пользователь с таким именем или паролем уже существует')
            }
        }
    }
    return (
        <AuthForm
            title="Регистрация"
            button="Зарегистрироваться"
            onChange={handleInput}
            onSubmit={signUp}
            name={name}
            email={email}
            password={password}
            c_password={c_password}
            error={error}
            passwordsError = {passwordsError}
        />
    )
}
