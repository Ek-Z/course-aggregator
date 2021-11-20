import CircularProgress from '@mui/material/CircularProgress';
import style from './ProgressLoader.module.scss';

export const ProgressLoader = () => {
    return (
        <div className={style.loader_wrap}>
            <CircularProgress color="secondary" className={style.loader}/>
        </div>
    );
};
