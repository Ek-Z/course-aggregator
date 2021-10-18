//import style from './Course.module.scss'
import { Typography,CardMedia,CardContent,Card} from '@mui/material';

export const Course = ({item}) => {
    return (
        <Card sx={{ maxWidth: 500 }}>
            <CardMedia
            component="img"
            height={140}
            image="" alt="Course-image"
            alt="green iguana"
            />
            <CardContent>
                <Typography variant="h5">
                    {item.title}    
                </Typography>
                <Typography variant="body2">
                    {item.description}
                </Typography>
                <Typography variant="h6">
                    {item.author || 'Имя пользователя'}
                </Typography>
            </CardContent>
        </Card>
    );
};
             