import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { logout as logoutApi } from '../../services/apiAuth';

export function useLogout() {
    // используем хук useNavigate для навигации
    const navigate = useNavigate();

    // получаем доступ к нашему экземпляру запросов React Query который мы создавали в App(в нашем случае queryClient)
    const queryClient = useQueryClient();

    // создаем мутацию для выхода из системы
    const { mutate: logout, isLoading } = useMutation({
        mutationFn: logoutApi,
        onSuccess: () => {
            // удаляем данные пользователя из кэша (для безопасности)
            queryClient.removeQueries(); // удаляем все кэшированные данные (но можно указать конкретные ключи)

            // перенаправляем пользователя на главную страницу
            navigate('/login', { replace: true }); // { replace: true } - заменяет текущий URL в истории браузера на новый чтобы не было возможности нажать назад в браузере
        },
    });

    return { logout, isLoading };
}
