import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';

import { getBookings } from '../../services/apiBookings';

// кастомный хук для получения данных из API
// для дальейшего удобного использования в компонентах
export function useBookings() {
    // хук для работы с URL
    const [searchParams] = useSearchParams();

    /* ФИЛЬТРАЦИЯ */
    const filterValue = searchParams.get('status'); // получаем текущее значение фильтра из URL

    // создаем объект фильтра
    const filter =
        // если значение фильтра не задано или равно 'all' (зашли только на страницу bookings) то ничего не фильтруем
        !filterValue || filterValue === 'all'
            ? null
            : { field: 'status', value: filterValue }; // создаем объект фильтра
    // { field: 'totalPrice', value: 5000, method: 'gte' }; // method - метод фильтрации superbase для гибкости (по умолчанию 'eq' в apiBookings)

    const {
        isLoading,
        data: bookings,
        error,
    } = useQuery({
        queryKey: ['bookings', filter], // при изменении значения фильтра реакт будет обновить данные на странице (как в массиве зависимостей useEffect)
        queryFn: () => getBookings({ filter }), // функция запроса(обязательно должна возвращать Promise)
    });

    return { bookings, isLoading, error };
}
