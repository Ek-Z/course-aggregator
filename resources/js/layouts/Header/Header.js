import { Link } from 'react-router-dom';
import { AppBar, Button, Avatar, Container, IconButton, Toolbar } from '@mui/material';
import { Box } from '@mui/system';
import style from './Header.module.scss';

export const Header = () => {
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
                        <Button color="inherit" variant="outlined" sx={{ marginRight: '1.5rem' }}>
                            <Link className={style.headerLinks} to="/admin">
                                Добавить курс
                            </Link>
                        </Button>
                        <Button color="secondary" variant="contained" sx={{ color: 'inherit' }}>
                            <Link className={style.headerLinks} to="/signUp">
                                Регистрация
                            </Link>
                        </Button>
                    </Box>
                    <IconButton color="inherit" aria-label="profile">
                        <Link to="/signIn">
                            <Avatar/>
                        </Link>
                    </IconButton>
                </Toolbar>
            </Container>
        </AppBar>
    );
};
