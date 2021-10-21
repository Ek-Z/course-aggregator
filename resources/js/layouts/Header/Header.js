import Button from '@mui/material/Button';
import { AppBar, Avatar, Container, IconButton, Toolbar } from '@mui/material';
import { Box } from '@mui/system';

export const Header = () => {
    return (
        <AppBar position="static">
            <Container>
                <Toolbar>
                    <Box sx={{ height: 40 }}>
                        <svg>
                            <use xlinkHref="/assets/icons.svg#main-logo" />
                        </svg>
                    </Box>
                    <Box mr={3} ml={'auto'}>
                        <Button color="inherit" variant="outlined" sx={{ marginRight: '1.5rem' }}>
                            Добавить курс
                        </Button>
                        <Button color="inherit" variant="outlined" sx={{ marginRight: '1.5rem' }}>
                            Войти
                        </Button>
                        <Button color="secondary" variant="contained" sx={{ color: 'inherit' }}>
                            Регистрация
                        </Button>
                    </Box>
                    <IconButton color="inherit" aria-label="profile">
                        <Avatar />
                    </IconButton>
                </Toolbar>
            </Container>
        </AppBar>
    );
};
