import { Link } from 'react-router-dom';
import { AppBar, Button, Avatar, Container, IconButton, Toolbar } from '@mui/material';
import { Box } from '@mui/system';
import style from './Header.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { logOut } from '../../store/session';
import { selectSessionState, selectUserName } from '../../store/session/selectors';
import Tooltip from '@mui/material/Tooltip';

export const Header = () => {
    const sessionState = useSelector(selectSessionState);//авторизован ли пользователь
    const userName = useSelector(selectUserName);//достаем имя пользователя для вывода на экран
    const dispatch = useDispatch();
    //Функция для выхода
    const signOut = async (e) => {
        try {
            await axios.post('api/logout', {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            localStorage.removeItem('users');
            dispatch(logOut());
        } catch (e) {
            console.log(`Error! ${e}`);
        }
    };

    return (
        <AppBar position="static">
            <Container>
                <Toolbar>
                    <Box sx={{ height: 40 }}>
                        <Link className={style.headerLinks} to="/">
                            <svg className={style.logo}>
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
                        {sessionState &&
                        <Tooltip title="Мои закладки">
                            <Button color="inherit" variant="outlined" sx={{ marginRight: '1.5rem' }}>
                                {/*Указать ссылку на страницу "Избранное"*/}
                                <Link className={style.headerLinks} to="#">
                                    <i className="fas fa-heart">
                                        <div className={style.counterBlock}>0</div>
                                    </i>
                                </Link>
                            </Button>
                        </Tooltip>
                        }
                        {sessionState &&
                        <Button color="inherit" variant="outlined" sx={{ marginRight: '1.5rem' }}>
                            <Link className={style.headerLinks} to="/admin">
                                Добавить курс
                            </Link>
                        </Button>}
                    </Box>
                    {!sessionState &&
                    <Tooltip title="Войти">
                        <IconButton color="inherit" aria-label="profile">
                            <Link to="/signIn">
                                <Avatar/>
                            </Link>
                        </IconButton>
                    </Tooltip>
                    }
                    {sessionState && <>
                        <Button color="inherit" variant="outlined" sx={{ marginRight: '1.5rem', border: 0 }}>
                            {userName}
                        </Button>
                        <Button onClick={() => signOut()} color="inherit" variant="outlined"
                                sx={{ marginRight: '1.5rem', border: 0 }}>
                            Выйти
                        </Button>
                    </>}
                </Toolbar>
            </Container>
        </AppBar>
    );
};
