import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'react-hot-toast';

import GlobalStyles from './styles/GlobalStyles';
import Dashboard from './pages/Dashboard';
import Bookings from './pages/Bookings';
import Cabins from './pages/Cabins';
import Users from './pages/Users';
import Settings from './pages/Settings';
import Account from './pages/Account';
import Login from './pages/Login';
import PageNotFound from './pages/PageNotFound';
import Booking from './pages/Booking';
import AppLayout from './ui/AppLayout';
import Checkin from './pages/Checkin';
import ProtectedRoute from './ui/ProtectedRoute';
import { DarkModeProvider } from './context/DarkModeContext';

/* React Query */
// Создаем клиента React Query с помощью конструктор new QueryClient
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            // staleTime: 60 * 1000, // времени жизни кэша (1 мин)
            staleTime: 0,
        },
    },
});

function App() {
    return (
        // оборачиваем в DarkModeProvider для использования контекста переключения темы
        <DarkModeProvider>
            {/* React Query Provider позволяет использовать React Query во всем
            приложении */}
            <QueryClientProvider client={queryClient}>
                {/* подключаем к приложению инструменты разработчика */}
                <ReactQueryDevtools initialIsOpen={false} />

                {/* Глобальные стили */}
                <GlobalStyles />
                <BrowserRouter
                    future={{
                        // future flags
                        v7_relativeSplatPath: true,
                        v7_startTransition: true,
                    }}
                >
                    <Routes>
                        <Route
                            element={
                                /* оборачиваем в ProtectedRoute для проверки аутентификации, т.е. только для авторизованных пользователей */
                                <ProtectedRoute>
                                    <AppLayout />
                                </ProtectedRoute>
                            }
                        >
                            {/* Navigate - для редиректа по умолчанию на страницу dashboard */}
                            <Route
                                index
                                element={<Navigate replace to="dashboard" />}
                            />

                            <Route path="dashboard" element={<Dashboard />} />

                            <Route path="bookings" element={<Bookings />} />
                            {/* страница информации о бронировании */}
                            <Route
                                path="bookings/:bookingId"
                                element={<Booking />}
                            />
                            {/* страница регистрации бронирования */}
                            <Route
                                path="checkin/:bookingId"
                                element={<Checkin />}
                            />
                            <Route path="cabins" element={<Cabins />} />
                            <Route path="users" element={<Users />} />
                            <Route path="settings" element={<Settings />} />
                            <Route path="account" element={<Account />} />
                        </Route>

                        {/* login page и page not found будут отдельными страницами, и не будут находиться внутри AppLayout */}
                        <Route path="login" element={<Login />} />
                        <Route path="*" element={<PageNotFound />} />
                    </Routes>
                </BrowserRouter>

                {/* горячие уведомления */}
                <Toaster
                    position="top-center"
                    gutter={12}
                    containerStyle={{ margin: '8px' }}
                    toastOptions={{
                        success: {
                            duration: 3000,
                        },
                        error: {
                            duration: 5000,
                        },
                        style: {
                            fontSize: '16px',
                            maxWidth: '500px',
                            padding: '16px 24px',
                            backgroundColor: 'var(--color-grey-0)',
                            color: 'var(--color-grey-700)',
                        },
                    }}
                />
            </QueryClientProvider>
        </DarkModeProvider>
    );
}

export default App;
