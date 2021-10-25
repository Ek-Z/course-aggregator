import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectCourseList, selectFilteredList, selectIsFiltered } from '../../store/courseList/selectors';
import { Course } from '../../components/Course/Course';
import { courseListFilter, getCourseList } from '../../store/courseList/action';
import { CourseFilter } from '../../components/CourseFilter/CourseFilter';
import style from './Catalog.module.scss';
import { Grid } from '@mui/material';
import { Box } from '@mui/system';
import { useParams, Route, Switch } from 'react-router-dom';
import { CourseCard } from '../../components/CourseCard/CourseCard';

export const Catalog = () => {
    const courseList = useSelector(selectCourseList);
    const filteredList = useSelector(selectFilteredList);
    const isFiltered = useSelector(selectIsFiltered);
    const { courseId } = useParams();

    const dispatch = useDispatch();

    const handleFilter = useCallback((value) => {
        dispatch(courseListFilter(value, courseList));
    });

    useEffect(() => {
        dispatch(getCourseList());
    }, []);

    return (
        <Switch>
            <Route exact={true} path="/courses">
                <section className={style.section}>
                    <div className={`${style.section__wrap} container`}>
                        <Box sx={{ flexGrow: 1, display: 'flex' }}>
                            <CourseFilter onSubmit={handleFilter}/>
                            <Grid container justifyContent="center" spacing={{ xs: 3 }}>
                                {isFiltered
                                    ? filteredList.map((course) => <Course key={course.id} item={course}/>)
                                    : courseList.map((course) => <Course key={course.id} item={course}
                                                                         courseId={courseId}/>)}
                            </Grid>
                        </Box>
                    </div>
                </section>
            </Route>
            <Route exact={true} path={`/courses/${courseId}`}>
                <CourseCard course={{}} courseId={courseId}/>
            </Route>
        </Switch>
    );
};
