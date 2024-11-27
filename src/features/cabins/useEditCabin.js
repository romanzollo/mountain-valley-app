import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { createEditCabin } from '../../services/apiCabins';

export function useEditCabin() {
    const queryClient = useQueryClient();

    /* === создаем мутацию для редактирования (React Query) === */
    const { mutate: editCabin, isLoading: isEditing } = useMutation({
        mutationFn: ({ newCabinData, id }) => createEditCabin(newCabinData, id),
        onSuccess: () => {
            // выводим уведомление с помощью react-hot-toast
            toast.success('Cabin successfully edited');

            queryClient.invalidateQueries({
                queryKey: ['cabins'], // ключ запроса который нужно обновить (его мы выбрали в CabinTable - queryKey: ['cabins'])
            });
        },
        // выводим уведомление с помощью react-hot-toast
        onError: (err) => toast.error(err.message),
    });

    return { isEditing, editCabin };
}
