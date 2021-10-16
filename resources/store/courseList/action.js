const LOCAL_COURSE_API = 'http://course-aggregator/resources/data/data.json';

export const COURSE_LIST_ONLOAD = 'COURSE_LIST::COURSE_LIST_ONLOAD';
export const COURSE_LIST_LOADED = 'COURSE_LIST::COURSE_LIST_LOADED';
export const COURSE_LIST_FAILED = 'COURSE_LIST::COURSE_LIST_FAILED';

export const courseListOnload = () => ({
    type: COURSE_LIST_ONLOAD,
});

export const courseListLoaded = (courseList) => ({
    type: COURSE_LIST_LOADED,
    payload: courseList,
});

export const courseListFailed = (err) => ({
    type: COURSE_LIST_FAILED,
    payload: err
});

export const getCourseList = () => async (dispatch) => {
    dispatch(courseListOnload());

    try {
        const response = await fetch(LOCAL_COURSE_API);
        console.log(response);

        if (!response.ok) {
            console.log('Error throwed');
        }

        const result = await response.json();

        dispatch(courseListLoaded(result));
    } catch (e) {
        dispatch(courseListFailed(e));
    }
};
