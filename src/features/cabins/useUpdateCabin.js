import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { createUpdateCabin } from '../../services/apiCabins';

export function useUpdateCabin() {
    const queryClient = useQueryClient();

    /* === создаем мутацию для редактирования (React Query) === */
    const { mutate: updateCabin, isLoading: isUpdating } = useMutation({
        mutationFn: ({ newCabinData, id }) =>
            createUpdateCabin(newCabinData, id),
        onSuccess: () => {
            // выводим уведомление с помощью react-hot-toast
            toast.success('Cabin successfully updated');

            queryClient.invalidateQueries({
                queryKey: ['cabins'], // ключ запроса который нужно обновить (его мы выбрали в CabinTable - queryKey: ['cabins'])
            });
        },
        // выводим уведомление с помощью react-hot-toast
        onError: (err) => toast.error(err.message),
    });

    return { isUpdating, updateCabin };
}
