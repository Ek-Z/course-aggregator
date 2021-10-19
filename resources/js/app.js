import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { Catalog } from './layouts/Catalog/Catalog';
import { store } from './store';
import { persistor } from './store';
import '../css/app.css';
import { StyledEngineProvider } from '@mui/material/styles';
import { Header } from './layouts/Header/Header';

function App() {
    return (
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <Header />
                <Catalog />
            </PersistGate>
        </Provider>
    );
}

export default App;

if (document.getElementById('app')) {
    ReactDOM.render(
        <StyledEngineProvider injectFirst>
            <App />
        </StyledEngineProvider>,
        document.getElementById('app')
    );
}
