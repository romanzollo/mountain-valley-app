import BookingRow from './BookingRow';
import Table from '../../ui/Table';
import Menus from '../../ui/Menus';
import Empty from '../../ui/Empty';
import Spinner from '../../ui/Spinner';

import { useBookings } from './useBookings';

function BookingTable() {
    // используем кастомный хук для получения данных из API
    const { bookings, isLoading } = useBookings();

    // показываем компонент Spinner если данные загружаются
    if (isLoading) return <Spinner />;

    // если массив bookings пустой, то отображаем компонент Empty
    if (!bookings.length) return <Empty resourceName="bookings" />;

    return (
        <Menus>
            {/*  передаем значение columns в компонент Table чтобы использовать
            эти значения во всех его дочерних компонентах (reusable components) */}
            <Table columns="0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem">
                <Table.Header>
                    <div>Cabin</div>
                    <div>Guest</div>
                    <div>Dates</div>
                    <div>Status</div>
                    <div>Amount</div>
                    <div></div>
                </Table.Header>

                {/* Render Props Pattern */}
                <Table.Body
                    data={bookings}
                    render={(booking) => (
                        <BookingRow key={booking.id} booking={booking} />
                    )}
                />
            </Table>
        </Menus>
    );
}

export default BookingTable;
