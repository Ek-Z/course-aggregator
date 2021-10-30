import { Link } from 'react-router-dom';
import { AppBar, Button, Avatar, Container, IconButton, Toolbar } from '@mui/material';
import { Box } from '@mui/system';
import style from './Header.module.scss';
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import {logOut} from "../../store/session";

export const Header = () => {
    const session = useSelector((state => state.profile.session))//авторизован ли пользователь
    const username = useSelector((state => state.profile.username))//достаем имя пользователя для вывода на экран
    const dispatch = useDispatch();
    //Функция для выхода
    const signOut = async (e) => {
        try {
            await axios.post("api/logout", {
                headers:{
                    'Content-Type': 'application/json'
                }
            });
            localStorage.removeItem("users")
            dispatch(logOut());
        }
        catch (e) {
            console.log(`Error! ${e}`)
        }
    }

    return (
        <AppBar position="static">
            <Container>
                <Toolbar>
                    <Box sx={{ height: 40, width: "16vh"}}>
                        <Link className={style.headerLinks} to="/">
                            <svg className={style.Logo}>
                                <use xlinkHref="/assets/icons.svg#main-logo"/>
                            </svg>
                        </Link>
                    </Box>
                    <Box mr={3} ml={'auto'}>
                        <Button color="inherit" variant="outlined" sx={{ marginRight: '1.5rem' }}>
                            <Link className={style.headerLinks} to="/courses">
                                Курсы
                            </Link>
                        </Button>
                        <Button color="inherit" variant="outlined" sx={{ marginRight: '1.5rem' }}>
                            <Link className={style.headerLinks} to="/admin">
                                Добавить курс
                            </Link>
                        </Button>
                        {!session &&
                        <Button color="secondary" variant="contained" sx={{ color: 'inherit' }}>
                            <Link className={style.headerLinks} to="/signUp">
                                Регистрация
                            </Link>
                        </Button>
                        }
                    </Box>
                    {!session &&
                    <IconButton color="inherit" aria-label="profile">
                        <Link to="/signIn">
                        <Avatar/>
                        </Link>
                        </IconButton>
                    }
                    {session && <>
                        <Button color="inherit" variant="outlined" sx={{ marginRight: '1.5rem', border: 0 }}>
                            {username}
                        </Button>
                        <Button onClick={() => signOut()}  color="inherit" variant="outlined" sx={{ marginRight: '1.5rem', border: 0 }}>
                            Выйти
                        </Button>
                    </>}
                </Toolbar>
            </Container>
        </AppBar>
    );
};
