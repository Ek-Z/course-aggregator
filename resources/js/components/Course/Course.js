//import style from './Course.module.scss'
import { Typography, CardMedia, CardContent, Card, Grid } from '@mui/material';

export const Course = ({ item }) => {
    return (
        <Grid item xs={5}>
            <Card sx={{ maxWidth: 500, height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardMedia component="img" height={140} image="" alt="Course-image" alt="green iguana" />
                <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <Typography variant="h5">{item.title}</Typography>
                    <Typography
                        sx={{ maxHeight: '5rem', textOverflow: 'ellipsis', overflow: 'hidden' }}
                        variant="body2"
                    >
                        {item.description}
                    </Typography>
                    <Typography sx={{ display: 'block', marginTop: 'auto', alignSelf: 'flex-end' }} variant="h6">
                        {item.author || 'Имя пользователя'}
                    </Typography>
                </CardContent>
            </Card>
        </Grid>
    );
};
