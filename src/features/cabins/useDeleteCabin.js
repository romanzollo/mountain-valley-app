import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { deleteCabin as deleteCabinApi } from '../../services/apiCabins';

export function useDeleteCabin() {
    // получаем доступ к нашему экземпляру запросов React Query который мы создавали в App(в нашем случае queryClient) - для обновления кэша
    // с помощью useQueryClient
    const queryClient = useQueryClient();

    // создаем мутацию для удаления (React Query)
    const { isLoading: isDeleting, mutate: deleteCabin } = useMutation({
        mutationFn: (id) => deleteCabinApi(id),
        // можно сократить до
        // mutationFn: deleteCabinApi,
        onSuccess: () => {
            // выводим уведомление с помощью react-hot-toast
            toast.success('Cabin successfully deleted!');

            queryClient.invalidateQueries({
                queryKey: ['cabins'], // ключ запроса который нужно обновить (его мы выбрали в CabinTable - queryKey: ['cabins'])
            });
        }, // если удаление прошло успешно

        // выводим уведомление с помощью react-hot-toast
        onError: (err) => toast.error(err.message), // если произошла ошибка
    });

    return { isDeleting, deleteCabin };
}
