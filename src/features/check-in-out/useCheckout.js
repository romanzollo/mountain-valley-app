import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateBooking } from '../../services/apiBookings';
import toast from 'react-hot-toast';

export function useCheckout() {
    // получаем доступ к нашему экземпляру запросов React Query который мы создавали в App(в нашем случае queryClient) - для обновления кэша
    // с помощью useQueryClient
    const queryClient = useQueryClient();

    /* ===  создаем мутацию для обновления статуса бронирования (React Query) === */
    const { mutate: checkOut, isLoading: isCheckOutLoading } = useMutation({
        // функция-мутации может принимать либо один аргумент, либо если нужно больше аргументов - передаем объект
        mutationFn: (bookingId) =>
            updateBooking(bookingId, {
                // меняем статус на checked-out
                status: 'checked-out',
            }),
        // updateBooking - функция из apiBookings.js для обновления данных бронирования на supabase

        onSuccess: (data) => {
            toast.success(`Booking №${data.id} successfully checked out`);

            // обновляем кэш
            queryClient.invalidateQueries({
                active: true, // обновляем только активные запросы
            });
        },

        // выводим уведомление с помощью react-hot-toast
        onError: () => toast.error('There was an error while checking out'),
    });

    return { isCheckOutLoading, checkOut };
}
