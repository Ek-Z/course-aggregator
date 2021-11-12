import { Link } from 'react-router-dom';
import {
    AppBar,
    Avatar,
    Container,
    IconButton,
    Toolbar,
    Button,
    ClickAwayListener,
    Grow,
    Paper,
    Popper,
    MenuItem,
    MenuList,
    Stack
} from '@mui/material';
import { Box } from '@mui/system';
import style from './Header.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { logOut } from '../../store/session';
import { selectSessionState, selectUserName, selectIsAdmin } from '../../store/session/selectors';
import Tooltip from '@mui/material/Tooltip';
import * as React from 'react';

export const Header = () => {
    const sessionState = useSelector(selectSessionState);//авторизован ли пользователь
    const userName = useSelector(selectUserName);//достаем имя пользователя для вывода на экран
    const isAdmin = useSelector(selectIsAdmin);//достаем статус пользователя (админ/не админ)
    const dispatch = useDispatch();
    //Функция для выхода
    const signOut = async (e) => {
        const userToken = JSON.parse(localStorage.getItem('userData')).data.token;//токен пользователя
        try {
            let response = await axios.post('api/logout', {}, {
                headers: {
                    'Authorization': `Bearer ${userToken}`
                }
            });
            if (response.status === 200) {
                localStorage.removeItem('userData');
                dispatch(logOut());
            } else {
                console.log('Ошибка! ', response);
            }
        } catch (e) {
            console.log(`Error! ${e}`);
        }
    };

    //настройки для выпадающего меню
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }

        setOpen(false);
    };

    function handleListKeyDown (event) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false);
        } else if (event.key === 'Escape') {
            setOpen(false);
        }
    }

    // return focus to the button when we transitioned from !open -> open
    const prevOpen = React.useRef(open);
    React.useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }

        prevOpen.current = open;
    }, [open]);

    return (
        <AppBar position="static">
            <Container>
                <Toolbar>
                    <Box sx={{ height: 40 }}>
                        <Link className={style.headerLinks} to="/">
                            <svg className={style.logo}>
                                <use xlinkHref="/assets/logo.svg#header-logo"/>
                            </svg>
                        </Link>
                    </Box>
                    <Box mr={3} ml={'auto'}>
                        <Button color="secondary" variant="contained" sx={{ marginRight: '1.5rem' }}>
                            <Link className={style.headerLinks} to="/courses">
                                Бесплатно
                            </Link>
                        </Button>
                        {sessionState &&
                        <Tooltip title="Мои закладки">
                            <Button color="inherit" variant="outlined" sx={{ marginRight: '1.5rem' }}>
                                {/*Указать ссылку на страницу "Избранное"*/}
                                <Link className={style.headerLinks} to="#">
                                    <i className="far fa-heart" style={{ fontSize: '20px' }}>
                                        <div className={style.counterBlock}>0</div>
                                    </i>
                                </Link>
                            </Button>
                        </Tooltip>
                        }
                        {isAdmin &&
                        <Tooltip title="Открыть панель администратора">
                            <Button color="inherit" variant="outlined" sx={{ marginRight: '1.5rem' }}>
                                <Link className={style.headerLinks} to="/admin">
                                    Админ-панель
                                </Link>
                            </Button>
                        </Tooltip>
                        }
                    </Box>
                    {!sessionState &&
                    <Box>
                        <Stack direction="row" spacing={2}>
                            <div>
                                <Tooltip title="Войти">
                                    <IconButton
                                        сolor="primary"
                                        aria-label="profile"
                                        ref={anchorRef}
                                        id="composition-button"
                                        aria-controls={open ? 'composition-menu' : undefined}
                                        aria-expanded={open ? 'true' : undefined}
                                        aria-haspopup="true"
                                        onClick={handleToggle}
                                    >

                                        <Avatar sx={{ bgcolor: '#000000' }}/>
                                    </IconButton>
                                </Tooltip>
                                <Popper
                                    open={open}
                                    anchorEl={anchorRef.current}
                                    role={undefined}
                                    placement="bottom-start"
                                    transition
                                    disablePortal
                                >
                                    {({ TransitionProps, placement }) => (
                                        <Grow
                                            {...TransitionProps}
                                            style={{
                                                transformOrigin:
                                                    placement === 'bottom-start' ? 'left top' : 'left bottom',
                                            }}
                                        >
                                            <Paper>
                                                <ClickAwayListener onClickAway={handleClose}>
                                                    <MenuList
                                                        autoFocusItem={open}
                                                        id="composition-menu"
                                                        aria-labelledby="composition-button"
                                                        onKeyDown={handleListKeyDown}
                                                    >
                                                        <MenuItem onClick={handleClose}>
                                                            <Link to="/signUp"
                                                                  style={{ textDecoration: 'none', color: 'black' }}>
                                                                Регистрация
                                                            </Link>
                                                        </MenuItem>
                                                        <MenuItem onClick={handleClose}>
                                                            <Link to="/signIn"
                                                                  style={{ textDecoration: 'none', color: 'black' }}>
                                                                Авторизация
                                                            </Link>
                                                        </MenuItem>
                                                    </MenuList>
                                                </ClickAwayListener>
                                            </Paper>
                                        </Grow>
                                    )}
                                </Popper>
                            </div>
                        </Stack>
                    </Box>
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
