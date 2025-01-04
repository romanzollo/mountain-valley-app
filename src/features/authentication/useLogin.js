import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

import { login as loginApi } from '../../services/apiAuth';

// кастомный хук логина
export function useLogin() {
    // используем хук useNavigate для навигации
    const navigate = useNavigate();

    // создаем мутацию для логина
    const { mutate: login, isLoading } = useMutation({
        // функция-мутации может принимать только один аргумент поэтому передаем ей объект и сразу его деструктуризируем
        mutationFn: ({ email, password }) => loginApi({ email, password }),

        onSuccess: () => {
            // перенаправляем пользователя на главную страницу
            navigate('/dashboard');
        },

        onError: (err) => {
            console.log('ERROR', err);

            // выводим уведомление с помощью react-hot-toast
            toast.error('Invalid email or password');
        },
    });

    return { login, isLoading };
}
