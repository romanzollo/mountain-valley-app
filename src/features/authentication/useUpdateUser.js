import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { updateCurrentUser } from '../../services/apiAuth';

export function useUpdateUser() {
    const queryClient = useQueryClient();

    /* === создаем мутацию для обновления данных пользователя (React Query) === */
    const { mutate: updateUser, isLoading: isUpdating } = useMutation({
        mutationFn: updateCurrentUser,
        onSuccess: ({ user }) => {
            // выводим уведомление с помощью react-hot-toast
            toast.success('User account successfully updated');

            // способ обновления кэша "в ручную" при необходимости (для этого user передать в качестве аргумента функции onSuccess)
            // queryClient.setQueryData(['user'], user);

            // обновляем кэш
            queryClient.invalidateQueries({
                queryKey: ['user'], // ключ запроса который нужно обновить
            });
        },
        // выводим уведомление с помощью react-hot-toast
        onError: (err) => toast.error(err.message),
    });

    return { updateUser, isUpdating };
}
