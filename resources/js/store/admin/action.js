import { createAction } from '@reduxjs/toolkit';
import { URLS } from '../../utils/urls/urls';

const ADMIN_ADD_COURSE = 'ADMIN::ADD_COURSE';
const ADMIN_DELETE_COURSE = 'ADMIN::DELETE_COURSE';

export const adminAddCourse = createAction(ADMIN_ADD_COURSE);
export const adminDeleteCourse = createAction(ADMIN_DELETE_COURSE);

export const addNewCourse = (courseData, userToken) => async dispatch => {

    try {
        const response = await fetch(URLS.ADMIN_COURSELIST, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userToken}`,
                'x-csrf-token': document.querySelector('[name=\'csrf-token\']').getAttribute('content')
            },
            body: JSON.stringify(courseData)
        });

        if (!response.ok) throw new Error(`Error: ${response.statusText}`);

        dispatch(adminAddCourse());

    } catch (err) {
        console.log(err);
    }
};
