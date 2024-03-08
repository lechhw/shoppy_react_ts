import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import router from './router/Routes.tsx';
import GlobalStyles from './styles/GlobalStyles.ts';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <RouterProvider router={router} />
        <GlobalStyles />
    </React.StrictMode>,
);
