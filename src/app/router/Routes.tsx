import { Navigate, createBrowserRouter } from 'react-router-dom';
import ErrorPage from '../../pages/error/ErrorPage';
import BaseLayout from '../layout/BaseLayout';
import HomePage from '../../pages/home/HomePage';
import ProductsPage from '../../pages/products/ProductsPage';
import NewProducts from '../../shared/products/NewProducts';
import AllProducts from '../../shared/products/AllProducts';
import CartsPage from '../../pages/carts/CartsPage';
import ProductDetail from '../../shared/products/ProductDetail';
import PermissionRoute from './PermissionRoute';

const router = createBrowserRouter([
    {
        path: '/',
        element: <BaseLayout />,
        errorElement: <ErrorPage />,
        children: [
            { index: true, element: <Navigate to={'/home'} /> },

            { path: 'home', element: <HomePage /> },
            {
                path: 'products',
                element: <ProductsPage />,
                errorElement: <ErrorPage />,
                children: [
                    { index: true, element: <AllProducts /> },
                    {
                        // 관리자 권한만 접근 가능
                        element: <PermissionRoute requireAdmin={true} />,
                        children: [{ path: 'new', element: <NewProducts /> }],
                    },
                    { path: ':id', element: <ProductDetail /> },
                ],
            },
            // 로그인한 사용자만 접근 가능
            { element: <PermissionRoute />, children: [{ path: 'carts', element: <CartsPage /> }] },
        ],
    },
    // { path: '/error/:code', element: <ErrorPage /> },
    // { path: '*', element: <Navigate to={'/error/404'} /> },
]);

export default router;
