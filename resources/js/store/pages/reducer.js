import { createReducer } from '@reduxjs/toolkit';
import { STATUSES } from '../../utils/statuses/statuses';
import {changePage, pagesLoaded} from "./action";

const initialState = {
  status: STATUSES.IDLE,
  currentPage:1,
  lastPage:1
};

export const pagesReducer = createReducer(initialState, builder => {
  builder
      .addCase(pagesLoaded, (state, { payload }) => {
          state.currentPage = payload.current_page;
          state.lastPage = payload.last_page;
      })
      .addCase(changePage, (state, { payload }) => {
          state.currentPage = payload
      })
      .addDefaultCase(() => {});
});
