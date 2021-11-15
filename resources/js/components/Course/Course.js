import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Typography, CardMedia, CardContent, Card, Grid } from '@mui/material';
import imagePlug from '../../../images/image-plug.jpg';
import style from './Course.module.scss';

export const Course = ({ item }) => {
    return (
        <Grid item xs={5}>
            <Link to={`/course/${item.id}`} style={{ textDecoration: 'none' }}>
                <Card className={style.course}
                      sx={{ maxWidth: 500, height: '100%', display: 'flex', flexDirection: 'column' }}>
                    {/*<CardMedia className={style.MuiCardMediaImg} component="img" height={200} image={item.image || imagePlug} alt="green iguana"/>*/}
                    <div className={style.image_wrap}>
                        <img className={style.image} src={item.image || imagePlug} alt="green iguana"/>
                    </div>
                    <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: '1rem', justifyContent: 'flex-start', padding: '24px 20px', boxSizing:'border-box', height:'50%'}}>
                        <Typography variant="h6">{item.title}</Typography>
                        <Typography
                            sx={{
                                maxHeight: '5rem',
                                textOverflow: 'ellipsis',
                                overflow: 'hidden',
                            }}
                            variant="body2"
                        >
                            {item.short_description}
                        </Typography>
                        <Typography
                            sx={{
                                alignSelf: 'flex-end',
                                margin:'auto 0 0 0',
                                textTransform: 'uppercase',
                                fontWeight: 600,
                            }}
                            color="secondary"
                            variant="body2">
                            Подробнее
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
