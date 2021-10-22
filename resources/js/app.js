import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Switch, Route } from "react-router-dom";
import { PersistGate } from 'redux-persist/integration/react';
import { Catalog } from './layouts/Catalog/Catalog';
import { store } from './store';
import { persistor } from './store';
import '../css/app.css';
import { Header } from './layouts/Header/Header';
import BrowserRouter from "react-router-dom/BrowserRouter";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {AdminPanel} from "./layouts/AdminPanel/AdminPanel";

const theme = createTheme({
    palette: {
        primary: {
            light: '#757ce8',
            main: '#3f50b5',
            dark: '#002884',
            contrastText: '#fff',
        },
        secondary: {
            light: '#ff7961',
            main: '#f44336',
            dark: '#ba000d',
            contrastText: '#000',
        },
    },
});

function App() {
    return (
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <ThemeProvider theme={theme}>
                    <BrowserRouter>
                        <Header />
                        <Switch>
                            <Route exact={true} path="/">
                                <Catalog />
                            </Route>
                            <Route exact={true} path="/admin">
                                <AdminPanel/>
                            </Route>
                            <Route exact={true} path="/signIn">
                                <h3>Авторизация</h3>
                            </Route>
                            <Route exact={true} path="/signUp">
                                <h3>Регистрация</h3>
                            </Route>
                        </Switch>
                    </BrowserRouter>
                </ThemeProvider>
            </PersistGate>
        </Provider>
    );
}

export default App;

if (document.getElementById('app')) {
    ReactDOM.render(<App />, document.getElementById('app'));
}
