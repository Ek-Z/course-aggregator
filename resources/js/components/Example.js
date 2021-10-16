import React from 'react';
import ReactDOM from 'react-dom';
import { CourseList } from './CourseList/CourseList';

function Example () {
    return (
        <CourseList/>
    );
}

export default Example;

if (document.getElementById('example')) {
    ReactDOM.render(<Example/>, document.getElementById('example'));
}
