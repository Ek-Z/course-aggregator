export const selectCourseList = state => state.courseList.courseList;
export const selectCourseListLength = state => state.courseList.courseList.length;
export const selectSortedCourseList = state => state.courseList.courseList.filter((course, index) => index < 5);
