import { Link } from 'react-router-dom';
import styled from 'styled-components';
import propTypes from 'prop-types';

import { Flag } from '../../ui/Flag';
import Tag from '../../ui/Tag';
import Button from '../../ui/Button';
import CheckoutButton from './CheckoutButton';

// --- styled components --- //
const StyledTodayItem = styled.li`
    display: grid;
    grid-template-columns: 9rem 2rem 1fr 7rem 9rem;
    gap: 1.2rem;
    align-items: center;

    font-size: 1.4rem;
    padding: 0.8rem 0;
    border-bottom: 1px solid var(--color-grey-100);

    &:first-child {
        border-top: 1px solid var(--color-grey-100);
    }
`;

const Guest = styled.div`
    font-weight: 500;
`;

// --- component --- //
function TodayItem({ activity }) {
    // извлекаем нужные нам данные (деструктуризация)
    const { id, guests, status, numNights } = activity;

    const worldFlag = guests.countryFlag || '/world-flag.svg';

    return (
        <StyledTodayItem>
            {/* отображаем тег с цветом в зависимости от статуса */}
            {status === 'unconfirmed' && <Tag type="green">Arriving</Tag>}
            {status === 'checked-in' && <Tag type="blue">Departing</Tag>}

            {/* отображаем флаг и имя пользователя */}
            <Flag src={worldFlag} alt={`Flag of ${guests.country}`} />
            <Guest>{guests.fullName}</Guest>

            {/* отображаем количество ночей */}
            <div>{numNights} nights</div>

            {/* отображаем кнопку "Check in" если статус "unconfirmed" */}
            {status === 'unconfirmed' && (
                <Button
                    size="small"
                    variation="primary"
                    as={Link} // делаем кнопку ссылкой с помощью Link из react-router
                    to={`/checkin/${id}`} // задаем путь для перехода
                >
                    Check in
                </Button>
            )}
            {/* отображаем кнопку "Check out" если статус "checked-in" */}
            {status === 'checked-in' && <CheckoutButton bookingId={id} />}
        </StyledTodayItem>
    );
}

export default TodayItem;

// --- prop-types --- //
TodayItem.propTypes = {
    activity: propTypes.object.isRequired,
};
