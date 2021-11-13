import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import imagePlug from '../../../images/image-plug.jpg';
import { Typography, CardMedia, CardContent, Card, Grid } from '@mui/material';

export const Course = ({ item }) => {
    return (
        <Grid item xs={5}>
            <Link to={`/course/${item.id}`} style={{ textDecoration: 'none' }}>
                <Card sx={{ maxWidth: 500, height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <CardMedia component="img" height={200} image={item.image || imagePlug} alt="green iguana"/>
                    <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <Typography variant="h5">{item.title}</Typography>
                        <Typography
                            sx={{ maxHeight: '5rem', textOverflow: 'ellipsis', overflow: 'hidden' }}
                            variant="body2"
                        >
                            {item.short_description}
                        </Typography>
                        <Typography sx={{ display: 'block', marginTop: 'auto', alignSelf: 'flex-end' }} variant="h6">
                            {item.author}
                        </Typography>
                    </CardContent>
                </Card>
            </Link>
        </Grid>
    );
};

Course.propTypes = {
    item: PropTypes.object,
};
