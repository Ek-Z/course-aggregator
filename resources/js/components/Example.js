import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { CourseList } from './CourseList/CourseList';
import { store } from '../../store';
import { persistor } from '../../store';
import '../../css/app.css';
import {Header} from "./Header/Header";
import { StyledEngineProvider } from '@mui/material/styles';

function Example () {
    return (
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <Header/>
                <CourseList/>
            </PersistGate>
        </Provider>
    );
}

export default Example;

if (document.getElementById('example')) {
    ReactDOM.render(
        <StyledEngineProvider injectFirst>
            <Example />
        </StyledEngineProvider>, document.getElementById('example'));
}
