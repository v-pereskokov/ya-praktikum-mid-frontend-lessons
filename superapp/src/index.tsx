// Рекомендую настроить eslint и порядок импортов:
// Сначала либы, потом абсолютные пути проекта, потом относительные, потом стили / json и тд
// Каждый блок отделяется пустой строчкой

import React from 'react';
import ReactDOM from 'react-dom';

import App from './containers/App';

import './styles/reset.css';

ReactDOM.render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>,
    document.getElementById('root')
);
