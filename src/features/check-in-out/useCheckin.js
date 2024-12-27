import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateBooking } from '../../services/apiBookings';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export function useCheckin() {
    // получаем доступ к нашему экземпляру запросов React Query который мы создавали в App(в нашем случае queryClient) - для обновления кэша
    // с помощью useQueryClient
    const queryClient = useQueryClient();

    // навигация
    const navigate = useNavigate();

    /* ===  создаем мутацию для обновления статуса бронирования (React Query) === */
    const { mutate: checkIn, isLoading: isCheckInLoading } = useMutation({
        // функция-мутации может принимать только один аргумент поэтому передаем ей объект и сразу его деструктурируем
        mutationFn: ({ bookingId, breakfast }) =>
            updateBooking(bookingId, {
                // меняем статус на checked-in и isPaid на true
                status: 'checked-in',
                isPaid: true,
                // добавляем данные о завтраке в виде объекта breakfast
                // если breakfast не был передан, то в объекте будет пустой объект
                ...breakfast,
            }),
        // updateBooking - функция из apiBookings.js для обновления данных бронирования на supabase

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
