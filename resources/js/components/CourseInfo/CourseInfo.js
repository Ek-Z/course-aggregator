import * as React from 'react';
import PropTypes from 'prop-types';
import Parser from 'html-react-parser';
import { Button } from '@mui/material';
import imagePlug from '../../../../public/images/image-plug.jpg';
import style from './CourseInfo.module.scss';

export const CourseInfo = ({ item }) => {
    return (
        <article className={style.course} data-course-id={item.id}>
            <div className={`${style.wrap} container`}>
                <h3 className={style.title}>{item.title}</h3>
                <div className={style.summary}>{item.short_description}</div>
                <div className={style.grid}>
                    <div className={style.description}>
                        {/*TODO: Сделать рендер описания по абзацам через параграфы*/}
                        <p>{Parser(item.description)}</p>
                    </div>
                    <img
                        src={item.image || imagePlug}
                        alt="green iguana"
                        className={style.image}
                    />
                    <div className={style.tags}>
                        <div>{item.source_name}</div>
                        <div>{item.language}</div>
                        <div>{item.programmingLanguage.title}</div>
                    </div>
                    <a
                        href={item.source_url}
                        target="_blank"
                    >
                        <Button
                            color="primary"
                            variant="contained"
                            sx={{
                                padding: 2,
                                color: '#fff',
                                fontWeight: 500,
                                fontSize: '15px'
                            }}
                        >
                            Перейти к курсу
                        </Button>
                    </a>
                </div>
            </div>
        </article>
    );
};

CourseInfo.propTypes = {
    item: PropTypes.object,
};
