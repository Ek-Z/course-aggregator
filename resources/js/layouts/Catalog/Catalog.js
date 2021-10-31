import { useSelector } from 'react-redux';
import { selectCourseList } from '../../store/courseList/selectors';
import { CourseList } from '../../components/CourseList/CourseList';
import { CourseFilter } from '../../components/CourseFilter/CourseFilter';

export const Catalog = () => {
    const courseList = useSelector(selectCourseList);

    return (
        <div className="container" style={{ display: 'flex', marginTop: 50 }}>
            <CourseFilter/>
            <CourseList list={courseList}/>
        </div>
    );
};
