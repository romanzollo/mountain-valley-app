import { useQuery } from '@tanstack/react-query';
import { getCurrentUser } from '../../services/apiAuth';

// создаем кастомный хук проверки пользователя на наличие авторизации и добавлении его в кэш с помощью React Query
export function useUser() {
    const { data: user, isLoading } = useQuery({
        queryKey: ['user'], // ключ запроса
        queryFn: getCurrentUser, // функция запроса
    });

    return {
        user,
        isLoading,
        // если user.role === 'authenticated' - то пользователь аутентифицирован
        isAuthenticated: user?.role === 'authenticated',
    };
}
