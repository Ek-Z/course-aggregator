import { Box } from '@mui/system';
import { CourseFilter } from '../CourseFilter/CourseFilter';
import { Grid } from '@mui/material';
import { Course } from '../Course/Course';
import style from './CourseList.module.scss';

export const CourseList = ({ list }) => {
    return (
        <section className={style.section}>
            <div className={`${style.section__wrap} container`}>
                <Box sx={{ flexGrow: 1, display: 'flex' }}>
                    {/*<CourseFilter/>*/}
                    <Grid container justifyContent="center" spacing={{ xs: 3 }}>
                        {list.map(item => <Course key={item.id} item={item}/>)}
                    </Grid>
                </Box>
            </div>
        </section>
    );
};
