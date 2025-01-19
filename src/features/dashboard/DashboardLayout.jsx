import styled from 'styled-components';

import Spinner from '../../ui/Spinner';
import Stats from './Stats';
import SalesChart from './SalesChart';
import DurationChart from './DurationChart';
import TodayActivity from '../check-in-out/TodayActivity';

import { useRecentBookings } from './useRecentBookings';
import { useRecentStays } from './useRecentStays';
import { useCabins } from '../cabins/useCabins';

// --- styled components --- //
const StyledDashboardLayout = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-rows: auto 34rem auto;
    gap: 2.4rem;
`;

// --- components --- //
function DashboardLayout() {
    // получаем данные о последних бронированиях с помощью кастомного хука
    const {
        isLoading: isLoadingBookings,
        bookings,
        numDays,
    } = useRecentBookings();
    // получаем данные о последних "проживаниях" с помощью кастомного хука
    const { isLoading: isLoadingStays, confirmedStays } = useRecentStays();
    // получаем данные о кабинах с помощью кастомного хука
    const { cabins, isLoading: isLoadingCabins } = useCabins();

    // показываем компонент Spinner если данные загружаются
    if (isLoadingBookings || isLoadingStays || isLoadingCabins)
        return <Spinner />;

    return (
        <StyledDashboardLayout>
            {/* статистика бронирования */}
            <Stats
                bookings={bookings}
                confirmedStays={confirmedStays}
                numDays={numDays} // количество дней
                cabinCount={cabins.length} // количество кабин
            />
            {/* актуальная информация о бронировании пользователей на текущий день (check-in, check-out) + с возможностью регистрации и снятия бронирования */}
            <TodayActivity />
            {/* круговая диаграмма продолжительности */}
            <DurationChart confirmedStays={confirmedStays} />
            {/* график продаж */}
            <SalesChart bookings={bookings} numDays={numDays} />{' '}
        </StyledDashboardLayout>
    );
}

export default DashboardLayout;
