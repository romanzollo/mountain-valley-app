import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { updateSetting as updateSettingApi } from '../../services/apiSettings';

export function useUpdateSetting() {
    const queryClient = useQueryClient();

    /* === создаем мутацию для обновления настроек (React Query) === */
    const { mutate: updateSetting, isLoading: isUpdating } = useMutation({
        mutationFn: updateSettingApi,
        onSuccess: () => {
            // выводим уведомление с помощью react-hot-toast
            toast.success('Setting successfully updated');

            queryClient.invalidateQueries({
                queryKey: ['settings'], // ключ запроса который нужно обновить
            });
        },
        // выводим уведомление с помощью react-hot-toast
        onError: (err) => toast.error(err.message),
    });

    return { isUpdating, updateSetting };
}
