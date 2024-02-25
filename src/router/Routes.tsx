import { Navigate, createBrowserRouter } from 'react-router-dom';
import ErrorPage from '../pages/error/ErrorPage';
import App from '../App';
import HomePage from '../pages/home/HomePage';
import ProductsPage from '../pages/products/ProductsPage';
import NewProducts from '../components/products/NewProducts';
import AllProducts from '../components/products/AllProducts';
import CartsPage from '../pages/carts/CartsPage';
import ProductDetail from '../components/products/ProductDetail';

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            { index: true, element: <Navigate to={'/home'} /> },

            { path: 'home', element: <HomePage /> },
            {
                path: 'products',
                element: <ProductsPage />,
                errorElement: <ErrorPage />,
                children: [
                    { index: true, element: <AllProducts />, errorElement: <ErrorPage /> },
                    { path: 'new', element: <NewProducts />, errorElement: <ErrorPage /> },
                    { path: ':id', element: <ProductDetail />, errorElement: <ErrorPage /> },
                ],
            },
            { path: 'carts', element: <CartsPage />, errorElement: <ErrorPage /> },
        ],
    },
    // { path: '/error/:code', element: <ErrorPage /> },
    // { path: '*', element: <Navigate to={'/error/404'} /> },
]);

export default router;
