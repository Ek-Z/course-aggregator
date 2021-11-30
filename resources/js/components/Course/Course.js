import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Typography, CardContent, Card, Grid } from '@mui/material';
import imagePlug from '../../../../public/images/image-plug.jpg';
import style from './Course.module.scss';
import {FavoriteCheckbox} from "../FavoriteCheckbox/FavoriteCheckbox";
import React from "react";
import {useSelector} from "react-redux";
import {selectUserName} from "../../store/session/selectors";


export const Course = ({ item }) => {
    const userName = useSelector(selectUserName);

    return (
        <Grid item xs={5} className={style.grid}>
                <Card className={style.course}
                      sx={{ maxWidth: 500, height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <Link to={`/course/${item.id}`} className={style.link}>
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
                            {userName ? <FavoriteCheckbox id={item.id}/> : <div></div>}
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
