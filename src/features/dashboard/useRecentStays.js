import { useQuery } from '@tanstack/react-query';
import { subDays } from 'date-fns';
import { useSearchParams } from 'react-router-dom';

import { getStaysAfterDate } from '../../services/apiBookings';

export function useRecentStays() {
    const [searchParams] = useSearchParams();

    // получаем количество дней, за которые хотим получить данные (7 дней по умолчанию)
    const numDays = !searchParams.get('last')
        ? 7
        : Number(searchParams.get('last'));

    // получаем дату запроса для работы с API supabase через apiBookings
    const queryDate = subDays(new Date(), numDays).toISOString(); // (текущая дата, количество дней которое нужно отнять) - получаем дату преобразуем в формат ISO

    /* ЗАПРОС ДАННЫХ - REACT QUERY */
    const { isLoading, data: stays } = useQuery({
        queryKey: ['stays', `last-${numDays}`], // ключ запроса (stays) и массив зависимостей при изменении которых нужно обновить данные
        queryFn: () => getStaysAfterDate(queryDate), // функция запроса
    });

    // получаем только подтвержденные данные о "проживаниях"
    const confirmedStays = stays?.filter(
        (stay) => stay.status === 'checked-in' || stay.status === 'checked-out'
    );

    return { stays, isLoading, confirmedStays };
}
