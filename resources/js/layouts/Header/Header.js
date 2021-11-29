import * as React from 'react';
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
import {selectSessionState, selectUserName, selectIsAdmin, selectSessionPending} from '../../store/session/selectors';
import Tooltip from '@mui/material/Tooltip';
import {logOutThunk} from "../../store/session/thunks";
import CircularProgress from "@mui/material/CircularProgress";
import {selectFavorites} from "../../store/favorites";

export const Header = () => {
    const sessionState = useSelector(selectSessionState);//авторизован ли пользователь
    const userName = useSelector(selectUserName);//достаем имя пользователя для вывода на экран
    const isAdmin = useSelector(selectIsAdmin);//достаем статус пользователя (админ/не админ)
    const pending = useSelector(selectSessionPending)
    const username = useSelector(selectUserName)
    const favoritesCount = useSelector(selectFavorites).length
    console.log(favoritesCount)

    const dispatch = useDispatch();
    //Функция для выхода
    const signOut = () => {
        dispatch(logOutThunk())
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
        <AppBar position="static" color="transparent">
            <Container>
                <Toolbar>
                    <Tooltip title="Главная страница">
                        <Box sx={{ height: 40 }}>
                            <Link className={style.headerLinks} to="/">
                                <svg className={style.logo}>
                                    <use xlinkHref="/assets/logo.svg#header-logo"/>
                                </svg>
                            </Link>
                        </Box>
                    </Tooltip>
                    <Box mr={3} ml={'auto'} sx={{ display: 'flex', alignItems: 'center' }}>
                        <Link className={style.headerLinks} to="/courses">
                            <Button color="secondary"
                                    variant="contained"
                                    sx={{ marginRight: '1.5rem', color: '#ffffff' }}
                            >
                                Бесплатно
                            </Button>
                        </Link>
                        {sessionState &&
                        <Tooltip title="Мои закладки">
                            <IconButton
                                color="default"
                                variant="outlined"
                                sx={{ border: 'none', width: '50px' }}
                            >
                                <Link className={style.headerLinks} to="/favorites">
                                    <i className="far fa-heart" style={{ fontSize: '20px', color: '#000' }}>
                                        <div className={style.counterBlock}>{favoritesCount}</div>
                                    </i>
                                </Link>
                            </IconButton>
                        </Tooltip>
                        }
                        {isAdmin &&
                        <Tooltip title="Открыть панель администратора">
                            <Button color="inherit" variant="outlined" sx={{ marginRight: '1.5rem', border:0 }}>
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
            {(pending && username) ? <CircularProgress color="secondary" style={{position:'absolute', left:'93%', top:'1%'}}/> : <div></div> }
        </AppBar>
    );
};
