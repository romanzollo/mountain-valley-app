import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { deleteBooking as deleteBookingApi } from '../../services/apiBookings';

export function useDeleteBooking() {
    // получаем доступ к нашему экземпляру запросов React Query который мы создавали в App(в нашем случае queryClient) - для обновления кэша
    // с помощью useQueryClient
    const queryClient = useQueryClient();

    // создаем мутацию для удаления (React Query)
    const { isLoading: isDeleting, mutate: deleteBooking } = useMutation({
        mutationFn: (id) => deleteBookingApi(id),
        // можно сократить до
        // mutationFn: deleteBookingApi,
        onSuccess: () => {
            // выводим уведомление с помощью react-hot-toast
            toast.success('Booking successfully deleted!');

            queryClient.invalidateQueries({
                queryKey: ['bookings'], // ключ запроса который нужно обновить (его мы выбрали в BookingTable - queryKey: ['bookings'])
            });
        }, // если удаление прошло успешно

        // выводим уведомление с помощью react-hot-toast
        onError: (err) => toast.error(err.message), // если произошла ошибка
    });

    return { isDeleting, deleteBooking };
}
