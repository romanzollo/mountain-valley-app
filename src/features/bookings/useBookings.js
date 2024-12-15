import { useQuery } from '@tanstack/react-query';

import { getBookings } from '../../services/apiBookings';

// кастомный хук для получения данных из API
// для дальейшего удобного использования в компонентах
export function useBookings() {
    const {
        isLoading,
        data: bookings,
        error,
    } = useQuery({
        queryKey: ['bookings'], // ключ запроса
        queryFn: getBookings, // функция запроса(обязательно должна возвращать Promise)
    });

    return { bookings, isLoading, error };
}
