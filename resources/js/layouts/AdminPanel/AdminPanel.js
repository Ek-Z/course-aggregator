import { useSelector } from 'react-redux';
import { AdminTable } from '../../components/AdminTable/AdminTable';
import { selectCourseList } from '../../store/courseList/selectors';
import { useEffect } from 'react';

export const AdminPanel = () => {
    const courses = useSelector(selectCourseList);

    useEffect(()=> {
        console.table(courses);
    }, [])

    return (
        <div style={{ marginTop: 20 }}>
            <h3>Это admin Page</h3>
            <AdminTable table={courses}/>
        </div>
    );
};
