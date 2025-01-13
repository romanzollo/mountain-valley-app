import styled from 'styled-components';

import Spinner from '../../ui/Spinner';

import { useRecentBookings } from './useRecentBookings';
import { useRecentStays } from './useRecentStays';

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
    const { isLoading: isLoadingBookings, bookings } = useRecentBookings();
    // получаем данные о последних "проживаниях" с помощью кастомного хука
    const { isLoading: isLoadingStays, stays } = useRecentStays();

    // показываем компонент Spinner если данные загружаются
    if (isLoadingBookings || isLoadingStays) return <Spinner />;

    return (
        <StyledDashboardLayout>
            <div>Statistics</div>
            <div>Today&apos;s activities</div> {/* Today's activities */}
            <div>Chart stay durations</div>
            <div>Chart sales</div>
        </StyledDashboardLayout>
    );
}

export default DashboardLayout;
