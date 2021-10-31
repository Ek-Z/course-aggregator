import { useSelector } from 'react-redux';
import { selectCourseList } from '../../store/courseList/selectors';
import { CourseList } from '../../components/CourseList/CourseList';
import { CourseFilter } from '../../components/CourseFilter/CourseFilter';

export const Catalog = () => {
    const courseList = useSelector(selectCourseList);

    return (
        <div className="container" style={{ display: 'flex', flexDirection: 'column', marginTop: 20 }}>
            <h2 style={{ textAlign: 'center', marginBottom: 50 }}>
                Список бесплатных курсов
            </h2>
            <div style={{ display: 'flex' }}>
                <CourseFilter/>
                <CourseList list={courseList}/>
            </div>
        </div>
    );
};
