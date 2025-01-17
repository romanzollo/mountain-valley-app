import { useQuery } from '@tanstack/react-query';
import { subDays } from 'date-fns';
import { useSearchParams } from 'react-router-dom';

import { getBookingsAfterDate } from '../../services/apiBookings';

// создаем кастомный хук
export function useRecentBookings() {
    // получаем параметры из URL
    const [searchParams] = useSearchParams();

    // получаем количество дней, за которые хотим получить данные (7 дней по умолчанию)
    const numDays = !searchParams.get('last')
        ? 7
        : Number(searchParams.get('last'));

    // получаем дату запроса для работы с API supabase через apiBookings
    const queryDate = subDays(new Date(), numDays).toISOString(); // (текущая дата, количество дней которое нужно отнять) - получаем дату преобразуем в формат ISO

    /* ЗАПРОС ДАННЫХ - REACT QUERY */
    const { isLoading, data: bookings } = useQuery({
        queryKey: ['bookings', `last-${numDays}`], // ключ запроса (bookings) и массив зависимостей при изменении которых нужно обновить данные
        queryFn: () => getBookingsAfterDate(queryDate), // функция запроса
    });

    return { bookings, isLoading, numDays };
}
