import { createReducer } from '@reduxjs/toolkit';
import { adminAddCourse, adminDeleteCourse, adminEditCourse } from './action';

export const adminReducer = createReducer({}, builder => {
    builder
        .addCase(adminAddCourse, () => {})
        .addCase(adminEditCourse, () => {})
        .addCase(adminDeleteCourse, () => {})
        .addDefaultCase(() => {});
});
