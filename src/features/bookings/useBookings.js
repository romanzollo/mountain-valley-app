import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';

import { getBookings } from '../../services/apiBookings';
import { PAGE_SIZE } from '../../utils/constants';

// кастомный хук для получения данных из API
// для дальейшего удобного использования в компонентах
export function useBookings() {
    // получаем доступ к нашему экземпляру запросов React Query который мы создавали в App(в нашем случае queryClient) - для обновления кэша
    // с помощью useQueryClient
    const queryClient = useQueryClient();

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

    // создаем объект сортировки
    const sortBy = {
        field,
        direction,
    };

    /* ПАГИНАЦИЯ */
    // получаем текущую страницу
    const page = !searchParams.get('page') // проверяем есть ли параметр page в URL и если его нет, то устанавливаем 1 страницу
        ? 1
        : Number(searchParams.get('page')); // переводим в число

    /* ЗАПРОС ДАННЫХ - QUERY */
    const {
        isLoading,
        data: { data: bookings, count } = {}, // чтобы не было ошибок - по умолчанию пустой объект
        error,
    } = useQuery({
        queryKey: ['bookings', filter, sortBy, page], // filter, sortBy и page чтобы при изменении значения фильтра и сортировки реакт обновлял данные на странице (как в массиве зависимостей useEffect)!!!
        queryFn: () => getBookings({ filter, sortBy, page }), // функция для получения данных
    });

    /* ПРЕДВАРИТЕЛЬНАЯ ЗАГРУЗКА - PRE-FETCHING */
    // вычисляем количество страниц
    const pageCount = Math.ceil(count / PAGE_SIZE);

    // предварительно загружаем данные в кэш для следующей страницы если она есть
    if (page < pageCount)
        queryClient.prefetchQuery({
            queryKey: ['bookings', filter, sortBy, page + 1], // так же как и при обычном запросе данных только подгружаем дополнительно данные для следующей страницы (page + 1)
            queryFn: () => getBookings({ filter, sortBy, page: page + 1 }), // так же как и при обычном запросе данных только подгружаем дополнительно данные для следующей страницы (page + 1)
        });

    // предварительно загружаем данные в кэш для предыдущей страницы если она есть
    if (page > 1)
        queryClient.prefetchQuery({
            queryKey: ['bookings', filter, sortBy, page - 1], // так же как и при обычном запросе данных только подгружаем дополнительно данные для предыдущей страницы (page - 1)
            queryFn: () => getBookings({ filter, sortBy, page: page - 1 }), // так же как и при обычном запросе данных только подгружаем дополнительно данные для предыдущей страницы (page - 1)
        });

    return { bookings, isLoading, error, count };
}
