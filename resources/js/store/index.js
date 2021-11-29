import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';
import { courseListReducer } from './courseList/reducer';
import { profileReducer } from "./session";
import {pagesReducer} from "./pages/reducer";
import {favoritesReducer} from "./favorites";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const persistConfig = {
    key: 'course-aggregator',
    blacklist: [],
    storage,
};

const rootReducer = combineReducers({
    courseList: courseListReducer,
    profile: profileReducer,
    pages:pagesReducer,
    favorites:favoritesReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(
    persistedReducer,
    composeEnhancers(applyMiddleware(thunk))
);

export const persistor = persistStore(store);
