import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Typography, CardMedia, CardContent, Card, Grid } from '@mui/material';
import imagePlug from '../../../../public/images/image-plug.jpg';
import style from './Course.module.scss';
import {FavoriteCheckbox} from "../FavoriteCheckbox/FavoriteCheckbox";
import React from "react";

export const Course = ({ item }) => {
    return (
        <Grid item xs={5} style={{ maxWidth: '460px' }}>
                <Card className={style.course}
                      sx={{ maxWidth: 500, height: '100%', display: 'flex', flexDirection: 'column' }}>
                    {/*<CardMedia className={style.MuiCardMediaImg} component="img" height={200} image={item.image || imagePlug} alt="green iguana"/>*/}
                    <Link to={`/course/${item.id}`} style={{ textDecoration: 'none' }}>
                        <div className={style.image_wrap}>
                            <img className={style.image} src={item.image || imagePlug} alt="green iguana"/>
                        </div>
                    </Link>
                    <CardContent sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1rem',
                        justifyContent: 'flex-start',
                        padding: '24px 20px',
                        boxSizing: 'border-box',
                        height: '50%'
                    }}>
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
                        <div style={{ display: 'flex', justifyContent:'space-between', margin: 'auto 0 0 0'}}>
                            <FavoriteCheckbox id={item.id}/>
                            <Link to={`/course/${item.id}`} style={{ textDecoration: 'none' }}>
                                <Typography
                                sx={{
                                    alignSelf: 'flex-end',
                                    margin: 'auto 0 0 0',
                                    textTransform: 'uppercase',
                                    fontWeight: 600,
                                }}
                                color="secondary"
                                variant="body2">
                                Подробнее
                                </Typography>
                            </Link>
                        </div>
                    </CardContent>
                </Card>
        </Grid>
    );
};

Course.propTypes = {
    item: PropTypes.object,
};
