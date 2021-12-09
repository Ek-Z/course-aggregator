import * as React from 'react';

import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import style from './Billboard.module.scss';

export const Billboard = () => {
    return (
        <div className={style.billboard}>
            <div>
                <h1 className={style.title}>
                    Начни учиться<br />
                    с нами сейчас!
                    <span>Бесплатные курсы по программированию.<br />
                        Навыки для светлого будущего.</span>
                </h1>
                <Link to="/courses">
                    <Button color="primary"
                        variant="contained"
                        sx={{
                            marginTop: '50px',
                            padding: 2,
                            fontWeight: 500,
                            fontSize: '15px'
                        }}

                    >
                        Перейти в каталог
                    </Button>
                </Link>
            </div>

            <div className={style.image}>

            </div>
        </div>
    );
};