import { useMutation } from '@tanstack/react-query';

import { signup as signupApi } from '../../services/apiAuth';
import toast from 'react-hot-toast';

export function useSignup() {
    // создаем мутацию для регистрации нового пользователя
    const { mutate: signup, isLoading } = useMutation({
        mutationFn: signupApi,

        onSuccess: (user) => {
            // выводим уведомление с помощью react-hot-toast
            toast.success(
                "Account successfully created! Please verufy the new account from the user's email address."
            );
        },
    });

    return { signup, isLoading };
}
