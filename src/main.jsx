import React from 'react';
import ReactDOM from 'react-dom/client';
import { ErrorBoundary } from 'react-error-boundary';

import App from './App.jsx';
import ErrorFallback from './ui/ErrorFallback.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        {/* Оборачиваем приложение в ErrorBoundary (из библиотеки react-error-boundary) для обработки ошибок */}
        <ErrorBoundary
            FallbackComponent={ErrorFallback} // компонент для отображения ошибки
            onReset={() => window.location.replace('/')} // функция для перезагрузки страницы
        >
            <App />
        </ErrorBoundary>
    </React.StrictMode>
);
