import * as React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
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
    Stack,
    CircularProgress,
    Tooltip
} from '@mui/material';
import { Box } from '@mui/system';
import { selectSessionState, selectUserName, selectIsAdmin, selectSessionPending } from '../../store/session/selectors';
import { logOutThunk } from "../../store/session/thunks";
import { selectFavorites, selectFavoritesPending } from "../../store/favorites";
import style from './Header.module.scss';

export const Header = () => {
    const sessionState = useSelector(selectSessionState);//авторизован ли пользователь
    const userName = useSelector(selectUserName);//достаем имя пользователя для вывода на экран
    const isAdmin = useSelector(selectIsAdmin);//достаем статус пользователя (админ/не админ)
    const pending = useSelector(selectSessionPending)
    const username = useSelector(selectUserName)
    const favoritesCount = useSelector(selectFavorites).length
    const favoritesPending = useSelector(selectFavoritesPending)
    const dispatch = useDispatch();
    let history = useHistory();

    //Функция для выхода
    const signOut = async () => {
        await dispatch(logOutThunk());
        await history.push("/")
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

    function handleListKeyDown(event) {
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
                <Toolbar className={style.block}>
                    <Tooltip title="Главная страница">
                        <Box sx={{ height: 40, width: 120, marginBottom: '10px', marginRight: '20px' }} className={style.logoWrp}>
                            <Link className={style.headerLinks} to="/">
                                <svg className={style.logo}>
                                    <use xlinkHref="/assets/logo.svg#header-logo" />
                                </svg>
                            </Link>
                        </Box>
                    </Tooltip>
                    <Box mr={3} ml={'auto'} sx={{ display: 'flex', alignItems: 'center' }} className={style.block}>
                        <Link className={style.headerLinks} to="/courses">
                            <Button color="primary"
                                variant="contained"
                                sx={{ marginRight: '1.5rem', color: '#ffffff' }}
                                className={style.logoWrp}
                            >
                                Курсы
                            </Button>
                        </Link>
                        {sessionState &&
                            <Tooltip title="Избранное">
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
                                <Button color="inherit" variant="outlined" sx={{ marginRight: '1.5rem', border: 0 }} className={style.logoWrp}>
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

                                            <Avatar sx={{ bgcolor: '#000000' }} />
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
                        <Button color="inherit" variant="outlined" sx={{ marginRight: '1.5rem', border: 0 }} className={style.logoWrp}>
                            {userName}
                        </Button>
                        <Button onClick={() => signOut()} color="inherit" variant="outlined" className={style.logoWrp}
                            sx={{ marginRight: '1.5rem', border: 0 }}>
                            Выйти
                        </Button>
                    </>}
                </Toolbar>
            </Container>
            {(pending && username) && <CircularProgress color="primary" style={{ position: 'absolute', left: '93%', top: '1%' }} />}
            {favoritesPending && <CircularProgress color="primary" style={{ position: 'fixed', left: '50%', top: '50%', zIndex: 999 }} />}
        </AppBar>
    );
};
