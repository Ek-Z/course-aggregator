import React from 'react';
import ReactDOM from 'react-dom';
import { Course } from './Course/Course';

function Example () {
    return (
        <Course/>
    );
}

export default Example;

if (document.getElementById('example')) {
    ReactDOM.render(<Example/>, document.getElementById('example'));
}
