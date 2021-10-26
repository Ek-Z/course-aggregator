import { ALL_COURSES_URL } from '../../../urls/urls';

export const COURSE_CARD_ONLOAD = 'COURSE_CARD_ONLOAD';
export const COURSE_CARD_LOADED = 'COURSE_CARD_LOADED';
export const COURSE_CARD_FAILED = 'COURSE_CARD_FAILED';

const courseCardOnload = () => ({
    type: COURSE_CARD_ONLOAD,
});

const courseCardLoaded = course => ({
    type: COURSE_CARD_LOADED,
    payload: course,
});

const courseCardFailed = error => ({
    type: COURSE_CARD_FAILED,
    payload: error,
});

export const getCourseInfo = courseId => async dispatch => {
    dispatch(courseCardOnload());

    try {
        const response = await fetch(`${ALL_COURSES_URL}/${courseId}`);

        if (!response.ok) {
            throw new Error(`Error status: ${response.status}`);
        }

        const result = await response
            .json()
            .then(json => json.data);

        dispatch(courseCardLoaded(result));
    } catch (error) {
        dispatch(courseCardFailed(error));
    }
};
