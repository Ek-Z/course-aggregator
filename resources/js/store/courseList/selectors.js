export const selectCourseTitles = state => Object.keys(state.courseList.courseList[0]);
export const selectCourseList = (state) => state.courseList.courseList;
export const selectCourseListLength = (state) => state.courseList.courseList.length;
export const selectBestCourses = (state) => state.courseList.courseList.slice(0, 6);
export const selectFilteredList = (state) => state.courseList.filteredList;
export const selectIsFiltered = (state) => state.courseList.isFiltered;
export const selectFilters = (state) => state.courseList.filters;
export const selectExactCourse = courseId => state => state.courseList.courseList.find(course => course.id === +courseId);
export const selectFilterWords = (state) => state.courseList.filterWords;
