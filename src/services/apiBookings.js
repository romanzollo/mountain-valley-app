import { getToday } from '../utils/helpers';
import { PAGE_SIZE } from '../utils/constants';
import supabase from './supabase';

// получение всех бронирований
export async function getBookings({ filter, sortBy, page } = {}) {
    let query = supabase
        .from('bookings')
        // загружаем только те данные, которые нам действительно нужны
        .select(
            'id, created_at, startDate, endDate, numNights, numGuests, status, totalPrice, cabins(name), guests(fullName, email)',
            {
                count: 'exact', // встроенный в superbase алгоритм для подсчета количества строк в таблице
            }
        ); // !!! загружаем также смежную информацию о гостях и о хижинах которые забронировали чтобы отобразить эту информацию в таблице ( в нашем случае: guests(fullName, email) => имя гостя + email, cabins(name) => название хижины ) !!! //
    // !!! если например нам нужны все данные, то можно использовать .select('*') или так же все смежные данные тогда .select('*, guests(*), cabins(*)') !!! //

    /* 
    пример запроса с условиями в superbase
    select('....')
        .eq('status', 'unconfirmed') - только бронирования в статусе "unconfirmed"
        .gte('totalPrice', 5000) -  только бронирования, у которых цена больше или равна 5000
    */

    /* ФИЛЬТРАЦИЯ на стороне сервера */
    // если есть фильтр тогда фильтруем на стороне сервера superbase
    if (filter)
        query = query[filter.method || 'eq'](filter.field, filter.value); // method - метод фильтрации superbase для гибкости (задан в компоненте useBookings) если не задан то по умолчанию 'eq'

    // --- !!!! т.к. getBookings функция а не компонент, мы не можем использовать хук useSearchParams. поэтому хук useSearchParams используется в компоненте useBookings. --- !!!! //

    /* СОРТИРОВКА на стороне сервера */
    if (sortBy)
        query = query.order(sortBy.field, {
            // объект с настроками сортировки
            ascending: sortBy.direction === 'asc', // если направление сортировки 'asc' то сортируем по возрастанию
        });

    /* ПАГИНАЦИЯ */
    if (page) {
        const from = (page - 1) * PAGE_SIZE;
        const to = from + PAGE_SIZE - 1;

        query = query.range(from, to); // range - метод из superbase для пагинации (откуда, до куда)
    }

    const { data, error, count } = await query;

    if (error) {
        console.error(error);
        throw new Error('Bookings could not be loaded');
    }

    return { data, count };
}

// получение информации о конкретном бронировании
export async function getBooking(id) {
    const { data, error } = await supabase
        .from('bookings')
        .select('*, cabins(*), guests(*)')
        .eq('id', id)
        .single();

    if (error) {
        console.error(error);
        throw new Error('Booking not found');
    }

    return data;
}

// возвращает все BOOKINGS, созданные после указанной даты. Полезно, например, для получения бронирований, созданных за последние 30 дней.
// date - должен быть в формате 'YYYY-MM-DD' (ISO String) так как в superbase дата хранится в таком  формате
export async function getBookingsAfterDate(date) {
    const { data, error } = await supabase
        .from('bookings') // откуда берем данные
        .select('created_at, totalPrice, extrasPrice') // выбираем нужные столбцы
        .gte('created_at', date) // фильтруем с даты создания и до нужной даты
        .lte('created_at', getToday({ end: true })); // фильтруем с даты создания и до сегодняшнего дня ({ end: true } - установить дату как КОНЕЦ дня, когда мы сравниваем ее с более ранними датами. Очень важно!)

    if (error) {
        console.error(error);
        throw new Error('Bookings could not get loaded');
    }

    return data;
}

// возвращает все данные о проживании, созданные после указанной даты.
export async function getStaysAfterDate(date) {
    const { data, error } = await supabase
        .from('bookings') // откуда берем данные
        .select('*, guests(fullName)') // выбираем нужные столбцы
        .gte('startDate', date) // фильтруем с даты начала бронирования и до нужной даты
        .lte('startDate', getToday()); // фильтруем с даты начала бронирования и до сегодняшнего дня

    if (error) {
        console.error(error);
        throw new Error('Bookings could not get loaded');
    }

    return data;
}

// функция возвращает все активные на сегодняшнюю дату бронирования (checked-in и checked-out)
export async function getStaysTodayActivity() {
    const { data, error } = await supabase
        .from('bookings') // откуда берем данные
        .select('*, guests(fullName, nationality, countryFlag)') // выбираем нужные столбцы
        .or(
            `and(status.eq.unconfirmed,startDate.eq.${getToday()}),and(status.eq.checked-in,endDate.eq.${getToday()})`
        )
        .order('created_at');

    /* .or(
            `and(status.eq.unconfirmed,startDate.eq.${getToday()}),and(status.eq.checked-in,endDate.eq.${getToday()})`
        ) 
    в superbase */
    //  одно и то же что:
    // (stay.status === 'unconfirmed' && isToday(new Date(stay.startDate))) || (stay.status === 'checked-in' && isToday(new Date(stay.endDate)))
    // "статус бронирования неподтвержден и начало сегодня" || "статус бронирования заселен и конец сегодня"

    if (error) {
        console.error(error);
        throw new Error('Bookings could not get loaded');
    }
    return data;
}

/* ОБНОВЛЕНИЕ БРОНИРОВАНИЯ */
// id - id бронирования, obj - объект с новыми данными
export async function updateBooking(id, obj) {
    const { data, error } = await supabase
        .from('bookings')
        .update(obj)
        .eq('id', id)
        .select()
        .single();

    if (error) {
        console.error(error);
        throw new Error('Booking could not be updated');
    }
    return data;
}

// удаление бронирования
export async function deleteBooking(id) {
    // REMEMBER RLS POLICIES
    const { data, error } = await supabase
        .from('bookings')
        .delete()
        .eq('id', id);

    if (error) {
        console.error(error);
        throw new Error('Booking could not be deleted');
    }
    return data;
}
