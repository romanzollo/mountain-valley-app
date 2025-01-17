import styled from 'styled-components';

import Spinner from '../../ui/Spinner';
import Stats from './Stats';

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
    const {
        isLoading: isLoadingStays,
        stays,
        confirmedStays,
    } = useRecentStays();
    // получаем данные о кабинах с помощью кастомного хука
    const { cabins, isLoading: isLoadingCabins } = useCabins();

    // показываем компонент Spinner если данные загружаются
    if (isLoadingBookings || isLoadingStays || isLoadingCabins)
        return <Spinner />;

    return (
        <StyledDashboardLayout>
            <Stats
                bookings={bookings}
                confirmedStays={confirmedStays}
                numDays={numDays} // количество дней
                cabinCount={cabins.length} // количество кабин
            />
            <div>Today&apos;s activities</div> {/* Today's activities */}
            <div>Chart stay durations</div>
            <div>Chart sales</div>
        </StyledDashboardLayout>
    );
}

export default DashboardLayout;
