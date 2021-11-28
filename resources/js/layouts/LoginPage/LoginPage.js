// Страница авторизации
import React from "react";
import { AuthForm } from "../../components/AuthForm/AuthForm";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector} from "react-redux"
import { logInThunk } from "../../store/session/thunks";
import { selectUserName } from "../../store/session/selectors";

export const LoginPage = () => {
    const username = useSelector(selectUserName)
    const dispatch = useDispatch();
    let history = useHistory();

    const [user, setUser] = React.useState({
        email: "",
        password: ""
    });

    //ошибка содержимого инпутов
    const [error,setError] = React.useState({
        name: "",
        email: "",
        password: "",
        confirm_password: ""
    })

    const onInputChange = e => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const signIn = (e) => {
        e.preventDefault();
        if(user.email === '') {
            setError({email: 'Поле email не должно быть пустым'});
        }
        else if(user.password === '') {
            setError({password: 'Поле пароля не должно быть пустым'});
        }
        else {
            dispatch(logInThunk(user))
        }
    }

    React.useEffect(() => {
        if (username){
            history.push("/")
        }
    },[username])

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
