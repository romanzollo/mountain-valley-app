import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import Spinner from './Spinner';
import { useUser } from '../features/authentication/useUser';

// --- styled components --- //
const FullPageSpinner = styled.div`
    height: 100vh;
    background-color: var(--color-grey-50);
    display: flex;
    justify-content: center;
    align-items: center;
`;

// --- components --- //
function ProtectedRoute({ children }) {
    // navigate можно вызывать только внутри другой функции (например внутри callback) или в useEffect поэтому используем навигацию в useEffect
    const navigate = useNavigate();

    // 1. загружаем данные о пользователе вошедшего в систему, прошел ли он аунтификацию
    const { user, isLoading, isAuthenticated } = useUser();

    // 2. если пользователь не аутентифицирован, отправляем его на страницу логина ("/login")
    useEffect(() => {
        // если загрузка данных завершена и пользователь оказался не аутентифицирован, отправляем его на страницу логина ("/login")
        if (!isAuthenticated && !isLoading) navigate('/login');
    }, [isAuthenticated, isLoading, navigate]);

    // 3. показываем спиннер пока проверяем аутентификацию
    if (isLoading)
        return (
            /* помещаем спиннер в компонент FullPageSpinner, чтобы он был на всю страницу */
            <FullPageSpinner>
                <Spinner />
            </FullPageSpinner>
        );

    // 4. если пользователь аутентифицирован, показываем дочерние компоненты компонента ProtectedRoute
    if (isAuthenticated) return children;
}

export default ProtectedRoute;

// --- prop-types --- //
ProtectedRoute.propTypes = {
    children: PropTypes.node,
};
