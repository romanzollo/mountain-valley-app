import { useEffect, useState } from 'react';
import styled from 'styled-components';
import BookingDataBox from '../../features/bookings/BookingDataBox';

import Row from '../../ui/Row';
import Heading from '../../ui/Heading';
import ButtonGroup from '../../ui/ButtonGroup';
import Button from '../../ui/Button';
import ButtonText from '../../ui/ButtonText';
import Spinner from '../../ui/Spinner';
import Checkbox from '../../ui/Checkbox';

import { useMoveBack } from '../../hooks/useMoveBack';
import { useBooking } from '../bookings/useBooking';
import { formatCurrency } from '../../utils/helpers';
import { useChecking } from './useCheckin';

const Box = styled.div`
    /* Box */
    background-color: var(--color-grey-0);
    border: 1px solid var(--color-grey-100);
    border-radius: var(--border-radius-md);
    padding: 2.4rem 4rem;
`;

function CheckinBooking() {
    // состояние для подтверждения оплаты
    const [confirmPaid, setConfirmPaid] = useState(false);

    // получаем данные из кеша React Query с помощью кастомного хука
    const { booking, isLoading } = useBooking();

    // получаем функцию для перехода назад
    const moveBack = useMoveBack();

    // используем useEffect для установки чекбокса при первичном рендере в состояние "checked", если оплата уже была подтверждена (paid)
    useEffect(() => setConfirmPaid(booking?.isPaid ?? false), [booking]); // ?? (nullish coalescing) - если booking.isPaid не определен ( undefined, null), то возвращается false

    // получаем функцию-мутации для обновления статуса бронирования (React Query)
    const { isCheckInLoading, checkIn } = useChecking();

    // показываем компонент Spinner если данные загружаются
    if (isLoading) return <Spinner />;

    const {
        id: bookingId,
        guests,
        totalPrice,
        numGuests,
        hasBreakfast,
        numNights,
    } = booking;

    function handleCheckin() {
        // если оплата не была подтверждена, то ничего не делаем
        if (!confirmPaid) return;

        // если оплата была подтверждена, то вызываем мутацию
        checkIn(bookingId);
    }

    return (
        <>
            <Row type="horizontal">
                <Heading as="h1">Check in booking №{bookingId}</Heading>
                <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
            </Row>

            <BookingDataBox booking={booking} />

            <Box>
                <Checkbox
                    id="confirm"
                    checked={confirmPaid}
                    onChange={() => setConfirmPaid((confirm) => !confirm)}
                    disabled={confirmPaid || isCheckInLoading} // если оплата уже была подтверждена, то нельзя ещё раз подтвердить
                >
                    I confirm that {guests.fullName} has paid the total amount{' '}
                    {formatCurrency(totalPrice)}
                </Checkbox>
            </Box>

            <ButtonGroup>
                <Button
                    onClick={handleCheckin}
                    disabled={!confirmPaid || isCheckInLoading}
                >
                    Check in booking №{bookingId}
                </Button>
                <Button variation="secondary" onClick={moveBack}>
                    Back
                </Button>
            </ButtonGroup>
        </>
    );
}

export default CheckinBooking;
