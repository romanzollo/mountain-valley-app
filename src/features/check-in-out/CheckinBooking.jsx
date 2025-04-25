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
import { useCheckin } from './useCheckin';
import { useSettings } from '../settings/useSettings';

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
    // состояние для добавления завтрака
    const [addBreakfast, setAddBreakfast] = useState(false);

    // получаем данные бронирования из кеша React Query с помощью кастомного хука
    const { booking, isLoading } = useBooking();
    // получаем данные настроек из кеша React Query с помощью кастомного хука
    const { settings, isLoading: isLoadingSettings } = useSettings();

    // получаем функцию для перехода назад
    const moveBack = useMoveBack();

    // используем useEffect для установки чекбокса при первичном рендере в состояние "checked", если оплата уже была подтверждена (paid)
    useEffect(() => setConfirmPaid(booking?.isPaid ?? false), [booking]); // ?? (nullish coalescing) - если booking.isPaid не определен ( undefined, null), то возвращается false

    // получаем функцию-мутации для обновления статуса бронирования (React Query)
    const { isCheckInLoading, checkIn } = useCheckin();

    // показываем компонент Spinner если данные загружаются
    if (isLoading || isLoadingSettings) return <Spinner />;

    // деструктуризируем данные бронирования
    const {
        id: bookingId,
        guests,
        totalPrice,
        numGuests,
        hasBreakfast,
        numNights,
    } = booking;

    // расчитываем стоимость завтрака
    const optionalBreakfastPrice =
        settings.breakfastPrice * numNights * numGuests;

    function handleCheckin() {
        // если оплата не была подтверждена, то ничего не делаем
        if (!confirmPaid) return;

        if (addBreakfast) {
            checkIn({
                bookingId,
                // устанавливаем свойства в объекте breakfast которые хотим обновить на supabase
                breakfast: {
                    hasBreakfast: true, // обновляем наличие завтрака
                    extrasPrice: optionalBreakfastPrice, // обновляем стоимость завтрака
                    totalPrice: totalPrice + optionalBreakfastPrice, // обновляем общую стоимость
                },
            });
        } else {
            // если завтрак не нужен, то передаем пустой объект
            checkIn({ bookingId, breakfast: {} });
        }
    }

    return (
        <>
            <Row type="horizontal">
                <Heading as="h1">Check in booking №{bookingId}</Heading>
                <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
            </Row>

            <BookingDataBox booking={booking} />

            {/* Добавление завтрака */}
            {!hasBreakfast && (
                <Box>
                    <Checkbox
                        id="breakfast"
                        checked={addBreakfast}
                        onChange={() => {
                            setAddBreakfast((add) => !add);

                            // устанавливаем состояние оплаты в false, т.к. завтрак необходимо теперь тоже оплатить
                            setConfirmPaid(false);
                        }}
                    >
                        Want to add breakfast for{' '}
                        {formatCurrency(optionalBreakfastPrice)}?
                    </Checkbox>
                </Box>
            )}

            {/* Подтверждение оплаты */}
            <Box>
                <Checkbox
                    id="confirm"
                    checked={confirmPaid}
                    onChange={() => setConfirmPaid((confirm) => !confirm)}
                    disabled={confirmPaid || isCheckInLoading} // если оплата уже была подтверждена, то нельзя ещё раз подтвердить
                >
                    I confirm that {guests.fullName} has paid the total amount{' '}
                    {!addBreakfast
                        ? formatCurrency(totalPrice)
                        : `
                        ${formatCurrency(
                            totalPrice + optionalBreakfastPrice
                        )} (${formatCurrency(totalPrice)} + ${formatCurrency(
                              optionalBreakfastPrice
                          )})`}
                </Checkbox>
            </Box>

            <ButtonGroup>
                <Button
                    onClick={handleCheckin}
                    disabled={!confirmPaid || isCheckInLoading}
                >
                    Check in booking №{bookingId}
                </Button>
                <Button $variation="secondary" onClick={moveBack}>
                    Back
                </Button>
            </ButtonGroup>
        </>
    );
}

export default CheckinBooking;
