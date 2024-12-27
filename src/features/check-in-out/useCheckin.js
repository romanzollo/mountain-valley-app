import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateBooking } from '../../services/apiBookings';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export function useChecking() {
    // получаем доступ к нашему экземпляру запросов React Query который мы создавали в App(в нашем случае queryClient) - для обновления кэша
    // с помощью useQueryClient
    const queryClient = useQueryClient();

    // навигация
    const navigate = useNavigate();

    /* ===  создаем мутацию для обновления статуса бронирования (React Query) === */
    const { mutate: checkIn, isLoading: isCheckInLoading } = useMutation({
        mutationFn: (bookingId) =>
            updateBooking(bookingId, { status: 'checked-in', isPaid: true }), // меняем статус на checked-in и isPaid на true
        // updateBooking - функция из apiBookings.js

        onSuccess: (data) => {
            toast.success(`Booking №${data.id} successfully checked in`);

            // обновляем кэш
            queryClient.invalidateQueries({
                active: true, // обновляем только активные запросы
            });

            // перенаправляем пользователя на домашнюю страницу
            navigate('/');
        },

        // выводим уведомление с помощью react-hot-toast
        onError: () => toast.error('There was an error while checking in'),
    });

    return { isCheckInLoading, checkIn };
}
