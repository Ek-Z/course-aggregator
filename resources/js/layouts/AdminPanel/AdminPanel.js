import { useSelector } from 'react-redux';
import { AdminTable } from '../../components/AdminTable/AdminTable';
import { selectCourseList, selectCourseTitles } from '../../store/courseList/selectors';

export const AdminPanel = () => {
    const titles = useSelector(selectCourseTitles);
    const courses = useSelector(selectCourseList);

    return (
        <div style={{ marginTop: 20 }}>
            <h3>Это admin Page</h3>
            <AdminTable titles={titles} table={courses}/>
        </div>
    );
};
