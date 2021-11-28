import { createReducer } from '@reduxjs/toolkit';
import { adminAddCourse, adminDeleteCourse } from './action';

export const adminReducer = createReducer({}, builder => {
    builder
        .addCase(adminAddCourse, () => {})
        .addCase(adminDeleteCourse, () => {})
        .addDefaultCase(() => {});
});
