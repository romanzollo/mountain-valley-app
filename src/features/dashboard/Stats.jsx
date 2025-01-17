import {
    HiOutlineBanknotes,
    HiOutlineBriefcase,
    HiOutlineCalendarDays,
    HiOutlineChartBar,
} from 'react-icons/hi2';
import PropTypes from 'prop-types';

import Stat from './Stat';
import { formatCurrency } from '../../utils/helpers';

function Stats({ bookings, confirmedStays, numDays, cabinCount }) {
    // 1. Количество бронирований
    const numBookings = bookings.length;

    // 2. Общая сумма продаж
    const sales = bookings.reduce(
        (total, booking) => total + booking.totalPrice,
        0
    );

    // 3. Количество подтверждённых бронирований (check-ins or checked-outs)
    const checkins = confirmedStays.length;

    // 4. Процент заполненности в процентах
    const occupation =
        confirmedStays.reduce((total, stay) => total + stay.numNights, 0) /
        (numDays * cabinCount);
    // num checked in nights / all available nights (num days * num cabins)

    return (
        <>
            <Stat
                title="Bookings"
                color="blue"
                icon={<HiOutlineBriefcase />}
                value={numBookings}
            />

            <Stat
                title="Sales"
                color="green"
                icon={<HiOutlineBanknotes />}
                value={formatCurrency(sales)}
            />

            <Stat
                title="Check ins"
                color="indigo"
                icon={<HiOutlineCalendarDays />}
                value={checkins}
            />

            <Stat
                title="Occupancy rate"
                color="yellow"
                icon={<HiOutlineChartBar />}
                value={Math.round(occupation * 100) + '%'} // округляем и добавляем %
            />
        </>
    );
}

export default Stats;

Stats.propTypes = {
    bookings: PropTypes.array,
    confirmedStays: PropTypes.array,
    numDays: PropTypes.number,
    cabinCount: PropTypes.number,
};
