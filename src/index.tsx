import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { App } from './App';
import { store } from './store/store';

import './lang/i18n';
import './styles/global.scss';

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <React.Suspense fallback={<div>Loading...</div>}>
                <App />
            </React.Suspense>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);
