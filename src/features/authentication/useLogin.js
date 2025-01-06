import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

import { login as loginApi } from '../../services/apiAuth';

// кастомный хук логина
export function useLogin() {
    const queryClient = useQueryClient();

    // используем хук useNavigate для навигации
    const navigate = useNavigate();

    // создаем мутацию для логина
    const { mutate: login, isLoading } = useMutation({
        // функция-мутации может принимать только один аргумент поэтому передаем ей объект и сразу его деструктуризируем
        mutationFn: ({ email, password }) => loginApi({ email, password }),

        onSuccess: (user) => {
            // помещаем "в ручную" данные пользователя в кэш с помощью React Query
            queryClient.setQueryData(['user'], user.user);

            // перенаправляем пользователя на главную страницу
            navigate('/dashboard', { replace: true }); // { replace: true } - заменяет текущий URL в истории браузера на новый чтобы не было возможности нажать назад в браузере
        },

        onError: (err) => {
            console.log('ERROR', err);

            // выводим уведомление с помощью react-hot-toast
            toast.error('Invalid email or password');
        },
    });

    return { login, isLoading };
}
