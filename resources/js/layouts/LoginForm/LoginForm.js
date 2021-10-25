//Форма регистрации и авторизации
import { useRouteMatch } from "react-router-dom";
import Input from "@mui/material/Input";
import {useState} from "react";
import styles from "./LoginForm.module.scss"
import { Button } from '@mui/material';

export function LoginForm() {
    const {url} = useRouteMatch();//данные из ссылки
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState("")
    const [result, setResult] = useState("")
    const [users, setUsers] = useState([])//пока что локальное состояние массива пользователей

    //валидация пароля
    const validate = (password) => {
        let regexp = /[0-9a-zA-Z!@#$%^&*]{8,}/g;
        return regexp.test(password)
    }

    //в зависимости от url выполняется либо добавление в бд либо поиск в бд и проверка пользователя
    const doAction = (e) =>{
        if (url === '/signUp'){
            addUser(e)
        }
        if (url === '/signIn'){
            console.log('функция проверки пользователя в бд')
        }
    }
    //addUser - для добавления в базу данных
    const addUser = (e) => {
        e.preventDefault();
        setPasswordError("");
        if (validate(password)){
            createUser(email, password);
            setResult('Данные отправлены')
        } else if (!validate(password)){
            console.log(password);
            setPasswordError('Пароль должен состоять не менее, чем из 8 следующих символов: 0-9a-zA-Z!@#$%^&*');
        }

    }

    //потом это перенести в store
    const createUser = (email, password) => {
        const user = {
            "email": email,
            "password":password,
        }
        setUsers([...users, user]);
        console.log("users: ",users)
    }

    return (
        <form className={styles.loginForm} onSubmit={(e) => doAction(e)}>
            <div className={styles.loginForm_block}>
                {(url === '/signIn') ? <h1 className={styles.loginForm_block_title}>Авторизация</h1> : <h1 className={styles.loginForm_block_title}>Регистрация</h1>}
                <Input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    fullWidth={true}
                    placeholder="Ваш email"
                    className={styles.loginForm_block_input}
                    type="email"
                />
                {(passwordError) && <div style={{ color:'red' }}>{passwordError}</div>}
                <Input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    fullWidth={true}
                    placeholder="Ваш пароль"
                    type="password"
                    className={styles.loginForm_block_input}
                />
                {(url === '/signIn') ? <Button type="submit" color="primary" variant="contained"
                                               className={styles.loginForm_block_btn}
                                               >Войти</Button>

                    : <Button type="submit" color="primary" variant="contained"
                              className={styles.loginForm_block_btn}
                              >Зарегистрироваться</Button>}

                {(result)&& <div style={{marginTop:'15px', textAlign:'center'}}>Пользователь успешно зарегистрирован!!!</div>}
            </div>
        </form>
    )
}
