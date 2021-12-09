import CircularProgress from '@mui/material/CircularProgress';
import style from './ProgressLoader.module.scss';

export const ProgressLoader = () => {
    return (
        <div className={style.loader_wrap}>
            <CircularProgress color="primary" className={style.loader} />
        </div>
    );
};
