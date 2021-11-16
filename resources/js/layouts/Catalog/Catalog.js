import {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    selectCourseList,
    selectCourseListLength,
    selectFilteredList,
    selectFilterWords,
} from '../../store/courseList/selectors';
import { CourseList } from '../../components/CourseList/CourseList';
import { CourseFilter } from '../../components/CourseFilter/CourseFilter';
import {getPublicCourseList} from '../../store/courseList/action';
import InputSearch from "../../components/InputSearch/InputSearch";
import style from "./Catalog.module.scss"
import Pagination from "@mui/material/Pagination";


export const Catalog = () => {
    const filterWords = useSelector(selectFilterWords);
    const filteredList = useSelector(selectFilteredList)
    const courseList = useSelector(selectCourseList);
    const courseListLength = useSelector(selectCourseListLength);
    const dispatch = useDispatch();

    const  [currentPage, setCurrentPage] = useState(1)//текущая страница = 1
    const [coursesPerPage] = useState(4)//всего курсов на странице

    //номер последней страницы пагинации
    const lastPageIndex = currentPage * coursesPerPage
    //номер первой страницы пагинации
    const firstCourseIndex = lastPageIndex - coursesPerPage

    //текущая страничка для нефильтрованного каталога (на ней высвечивается только часть из общего списка)
    const currentCourseList= courseList.slice(firstCourseIndex,lastPageIndex)
    //текущая страничка для отфильтрованного каталога
    const currentFilteredList= filteredList.slice(firstCourseIndex,lastPageIndex)

    //количество кнопок пагинации курсов без фильтрации
    const countCourses= Math.ceil(courseList.length/coursesPerPage)
    //количество кнопок пагинации курсов с фильтрацией
    const countFilteredCourses = Math.ceil(filteredList.length/coursesPerPage)

    useEffect(() => {
        !courseListLength && dispatch(getPublicCourseList());
    }, [dispatch]);

    return (
        <div className="container" style={{ display: 'flex', flexDirection: 'column', marginTop: 20 }}>
            <h2 style={{ textAlign: 'center', marginBottom: 50 }}>
                Список бесплатных курсов
            </h2>
            <InputSearch/>
            <div style={{ display: 'flex' }}>
                <CourseFilter/>
                <CourseList list={filterWords ? currentFilteredList : currentCourseList}/>
            </div>
            <Pagination className={style.pagination}
                        key={`button-${currentPage}`} /* fixed issue */
                        count={filterWords ? countFilteredCourses : countCourses}
                        defaultPage={currentPage}
                        onChange={(event, value) => setCurrentPage(value)}/>
        </div>
    );
};
