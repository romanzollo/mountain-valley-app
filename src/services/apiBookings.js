import { getToday } from '../utils/helpers';
import supabase from './supabase';

// получение всех бронирований
export async function getBookings({ filter, sortBy } = {}) {
    let query = supabase
        .from('bookings')
        // загружаем только те данные, которые нам действительно нужны
        .select(
            'id, created_at, startDate, endDate, numNights, numGuests, status, totalPrice, cabins(name), guests(fullName, email)'
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

    const { data, error } = await query;

    if (error) {
        console.error(error);
        throw new Error('Bookings could not be loaded');
    }

    return data;
}

// получение конкретного бронирования
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
export async function getBookingsAfterDate(date) {
    const { data, error } = await supabase
        .from('bookings')
        .select('created_at, totalPrice, extrasPrice')
        .gte('created_at', date)
        .lte('created_at', getToday({ end: true }));

    if (error) {
        console.error(error);
        throw new Error('Bookings could not get loaded');
    }

    return data;
}

// возвращает все пребывания, созданные после указанной даты.
export async function getStaysAfterDate(date) {
    const { data, error } = await supabase
        .from('bookings')
        // .select('*')
        .select('*, guests(fullName)')
        .gte('startDate', date)
        .lte('startDate', getToday());

    if (error) {
        console.error(error);
        throw new Error('Bookings could not get loaded');
    }

    return data;
}

// активность означает, что сегодня происходит заезд или выезд.
export async function getStaysTodayActivity() {
    const { data, error } = await supabase
        .from('bookings')
        .select('*, guests(fullName, nationality, countryFlag)')
        .or(
            `and(status.eq.unconfirmed,startDate.eq.${getToday()}),and(status.eq.checked-in,endDate.eq.${getToday()})`
        )
        .order('created_at');

    // Эквивалентно этому. Но, запрашивая это, мы загружаем только те данные, которые нам действительно нужны, иначе нам понадобятся ВСЕ когда-либо созданные бронирования.
    // (stay.status === 'unconfirmed' && isToday(new Date(stay.startDate))) ||
    // (stay.status === 'checked-in' && isToday(new Date(stay.endDate)))

    if (error) {
        console.error(error);
        throw new Error('Bookings could not get loaded');
    }
    return data;
}

// обновление бронирования
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
