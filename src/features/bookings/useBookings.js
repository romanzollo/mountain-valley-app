import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';

import { getBookings } from '../../services/apiBookings';

// кастомный хук для получения данных из API
// для дальейшего удобного использования в компонентах
export function useBookings() {
    // хук для работы с URL
    const [searchParams] = useSearchParams();

    /* ФИЛЬТРАЦИЯ */
    const filterValue = searchParams.get('status'); // получаем текущее значение фильтра из URL (all, checked-in, checked-out, unconfirmed)

    // создаем объект фильтра
    const filter =
        // если значение фильтра не задано или равно 'all' (зашли только на страницу bookings) то ничего не фильтруем
        !filterValue || filterValue === 'all'
            ? null
            : { field: 'status', value: filterValue }; // создаем объект фильтра
    // пример создания объекта фильтра с методом для большей гибкости: { field: 'totalPrice', value: 5000, method: 'gte' }; method - метод фильтрации superbase для гибкости (по умолчанию 'eq' в apiBookings)

    /* СОРТИРОВКА */
    const sortByValue = searchParams.get('sortBy') || 'startDate-desc'; // получаем текущее значение сортировки из URL (startDate-desc, startDate-asc, totalPrice-desc, totalPrice-asc)

    // разделяем sortBy на field и direction [startDate, desc]
    const [field, direction] = sortByValue.split('-');

    const sortBy = {
        field,
        direction,
    };

    const {
        isLoading,
        data: bookings,
        error,
    } = useQuery({
        queryKey: ['bookings', filter, sortBy], // filter и sortBy чтобы при изменении значения фильтра и сортировки реакт обновлял данные на странице (как в массиве зависимостей useEffect)!!!
        queryFn: () => getBookings({ filter, sortBy }), // функция запроса(обязательно должна возвращать Promise)
    });

    return { bookings, isLoading, error };
}
