//Форма регистрации и авторизации
import Input from "@mui/material/Input";
import {useState} from "react";
import styles from "./LoginForm.module.scss"
import { Button } from '@mui/material';

export function LoginForm({title, submitButton}) {
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("")
    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState("")
    const [result, setResult] = useState("")
    const [users, setUsers] = useState([])//пока что локальное состояние массива пользователей

    //addUser - для добавления в базу данных
    const addUser = (email,password) => {
        if(!email){
            setEmailError('Email не может быть пустым')
        }
        if(!password){
            setPasswordError('Пароль не может быть пустым')
        }
        if(email && password){
            createUser(email, password);
            setResult('Данные отправлены')
        }
    }
    //потом это перенести в store
    const createUser = (email, password) => {
        const element = new Object();
        element.email = email;
        element.password = password;
        console.log(element)
        setUsers([...users, element]);
        console.log("users: ",users )
    }

    return (
        <div className={styles.loginForm}>
            <div className={styles.loginForm_block}>
                <h1 className={styles.loginForm_block_title}>{title}</h1>
                {(emailError) && <div style={{ color:'red' }}>{emailError}</div>}
                <Input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    fullWidth={true}
                    placeholder="Ваш email"
                    className={styles.loginForm_block_input}
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
                <Button color="primary" variant="contained"
                        className={styles.loginForm_block_btn}
                        onClick={() => addUser(email, password)}>{submitButton}</Button>
                {(result)&& <div style={{marginTop:'15px', textAlign:'center'}}>Пользователь успешно зарегистрирован!!!</div>}

            </div>
        </div>

    )
}
