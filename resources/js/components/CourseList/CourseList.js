import { useEffect, useState } from 'react';
import { Course } from '../Course/Course';

export const CourseList = () => {
    const [courseList, setCourseList] = useState([]);

    useEffect(() => {
        setCourseList([...courseList,
            {
                id: 1,
                title: 'Cum nulla quae.',
                description: 'Aut nisi minima qui architecto velit excepturi eum expedita dolores ut et nulla ea non commodi qui alias quia quisquam omnis explicabo.',
                created_at: null,
                updated_at: null
            },
            {
                id: 2,
                title: 'Magni illum sed.',
                description: 'Nobis id consequatur officiis praesentium non consequuntur eos odio corporis rerum voluptatem architecto eum velit incidunt saepe delectus iusto exercitationem eligendi dolor dignissimos ex officiis sint officiis nihil modi suscipit omnis itaque suscipit voluptas commodi aliquam magnam exercitationem est quisquam praesentium sint eum rem cum aliquid libero saepe tempore necessitatibus ratione dolorum aut consequatur explicabo consequatur ut ut qui sunt laboriosam ea.',
                created_at: null,
                updated_at: null
            }]);
    }, []);

    return (
        <section>
            {courseList.map(course => <Course item={course} key={course.id}/>)}
        </section>
    );
};
