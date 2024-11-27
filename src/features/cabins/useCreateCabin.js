import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { createEditCabin } from '../../services/apiCabins';

export function useCreateCabin() {
    // получаем доступ к нашему экземпляру запросов React Query который мы создавали в App(в нашем случае queryClient) - для обновления кэша
    // с помощью useQueryClient
    const queryClient = useQueryClient();

    /* ===  создаем мутацию для добавления новой хижины (React Query) === */
    const { mutate: createCabin, isLoading: isCreating } = useMutation({
        mutationFn: (newCabin) => createEditCabin(newCabin),
        onSuccess: () => {
            // выводим уведомление с помощью react-hot-toast
            toast.success('New cabin successfully created!');

            queryClient.invalidateQueries({
                queryKey: ['cabins'], // ключ запроса который нужно обновить (его мы выбрали в CabinTable - queryKey: ['cabins'])
            });
        },
        // выводим уведомление с помощью react-hot-toast
        onError: (err) => toast.error(err.message),
    });

    return { isCreating, createCabin };
}
