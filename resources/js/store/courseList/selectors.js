export const selectCourseTitles = state => Object.keys(state.courseList.courseList[0]);
export const selectCourseList = (state) => state.courseList.courseList;
export const selectCourseListLength = (state) => state.courseList.courseList.length;
export const selectFilteredList = (state) => state.courseList.filteredList;
export const selectIsFiltered = (state) => state.courseList.isFiltered;
export const selectFilteredListLength = state => state.courseList.filteredList.length;
export const selectFilters = state => state.courseList.filters.data;
export const selectFiltersStatus = state => state.courseList.filters.status;
export const selectExactCourse = courseId => state => state.courseList.courseList.find(course => course.id === +courseId);
export const selectInputValue = state => state.courseList.filters.inputValue;
export const selectProgrammingLanguages = state => state.courseList.filters.data['Языки программирования'];
export const selectStatus = state => state.courseList.status
