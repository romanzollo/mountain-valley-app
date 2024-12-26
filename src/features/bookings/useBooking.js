import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

import { getBooking } from '../../services/apiBookings';

// кастомный хук для получения данных из API
// для дальейшего удобного использования в компонентах
export function useBooking() {
    // получаем bookingId из URL
    const { bookingId } = useParams();

    const {
        isLoading,
        data: booking,
        error,
    } = useQuery({
        queryKey: ['booking'], // ключ запроса
        queryFn: () => getBooking(bookingId), // функция запроса(обязательно должна возвращать Promise)
        retry: false, // убираем повторные запросы (по умолчанию библиотека React Query делает это в случае неудачи 3 раза, но в данном случае это не имеет смысла так как если бронирование не обнаружено, то его просто нет в базе данных)
    });

    return { booking, isLoading, error };
}
