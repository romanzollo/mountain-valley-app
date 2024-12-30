import styled from 'styled-components';
import { format, isToday } from 'date-fns';
import PropTypes from 'prop-types';
import {
    HiArrowDownOnSquare,
    HiArrowUpOnSquare,
    HiEye,
    HiTrash,
} from 'react-icons/hi2';
import { useNavigate } from 'react-router-dom';

import Tag from '../../ui/Tag';
import Table from '../../ui/Table';
import Menus from '../../ui/Menus';
import Modal from '../../ui/Modal';
import ConfirmDelete from '../../ui/ConfirmDelete';

import { useCheckout } from '../check-in-out/useCheckout';
import { formatCurrency } from '../../utils/helpers';
import { formatDistanceFromNow } from '../../utils/helpers';
import { useDeleteBooking } from './useDeleteBooking';

const Cabin = styled.div`
    font-size: 1.6rem;
    font-weight: 600;
    color: var(--color-grey-600);
    font-family: 'Sono';
`;

const Stacked = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.2rem;

    & span:first-child {
        font-weight: 500;
    }

    & span:last-child {
        color: var(--color-grey-500);
        font-size: 1.2rem;
    }
`;

const Amount = styled.div`
    font-family: 'Sono';
    font-weight: 500;
`;

function BookingRow({
    // деструктуризация объекта
    booking: {
        id: bookingId,
        // created_at,
        startDate,
        endDate,
        numNights,
        // numGuests,
        totalPrice,
        status,
        guests: { fullName: guestName, email },
        cabins: { name: cabinName },
    },
}) {
    // переключение между страницами
    const navigate = useNavigate();

    // получаем функцию для изменения статуса бронирования на checked-out
    const { checkOut, isCheckOutLoading } = useCheckout();

    // используем кастомный хук для удаления бронирования
    const { deleteBooking, isDeleting } = useDeleteBooking();

    // преобразовываем статус в цвет
    const statusToTagName = {
        unconfirmed: 'blue',
        'checked-in': 'green',
        'checked-out': 'silver',
    };

    return (
        <Table.Row>
            <Cabin>{cabinName}</Cabin>
            <Stacked>
                <span>{guestName}</span>
                <span>{email}</span>
            </Stacked>
            <Stacked>
                <span>
                    {isToday(new Date(startDate))
                        ? 'Today'
                        : formatDistanceFromNow(startDate)}{' '}
                    &rarr; {numNights} night stay
                </span>
                <span>
                    {format(new Date(startDate), 'MMM dd yyyy')} &mdash;{' '}
                    {format(new Date(endDate), 'MMM dd yyyy')}
                </span>
            </Stacked>
            <Tag type={statusToTagName[status]}>{status.replace('-', ' ')}</Tag>{' '}
            {/* status.replace('-', ' ') ===> checked-in => checked in */}
            <Amount>{formatCurrency(totalPrice)}</Amount>
            <Modal>
                {/* всплывающее меню для перехода к просмотру информации о каждом бронировании */}
                <Menus.Menu>
                    {/* id - чтобы при нажатии на toggle открывать только нужное меню(соответствующее id) */}
                    <Menus.Toggle id={bookingId} />
                    <Menus.List id={bookingId}>
                        <Menus.Button
                            icon={<HiEye />}
                            onClick={() => navigate(`/bookings/${bookingId}`)}
                        >
                            See details
                        </Menus.Button>

                        {/* показываем кнопку Check in только если бронирование еще не подтверждено */}
                        {status === 'unconfirmed' && (
                            <Menus.Button
                                icon={<HiArrowDownOnSquare />}
                                onClick={() =>
                                    navigate(`/checkin/${bookingId}`)
                                }
                            >
                                Check in
                            </Menus.Button>
                        )}

                        {/* показываем кнопку Check out только если бронирование уже подтверждено */}
                        {status === 'checked-in' && (
                            <Menus.Button
                                icon={<HiArrowUpOnSquare />}
                                onClick={() => checkOut(bookingId)}
                                disabled={isCheckOutLoading}
                            >
                                Check out
                            </Menus.Button>
                        )}

                        {/* кнопка Delete booking */}
                        <Modal.Open opens="delete">
                            <Menus.Button icon={<HiTrash />}>
                                Delete booking
                            </Menus.Button>
                        </Modal.Open>
                    </Menus.List>

                    {/* всплывающее окно удаления бронирования должно быть за пределами всплывающего меню и списка чтобы оно перекрывало весь экран */}
                    <Modal.Window name="delete">
                        {/* компонент всплывающего окна для подтверждения удаления */}
                        <ConfirmDelete
                            resourceName="booking"
                            disabled={isDeleting}
                            onConfirm={() => deleteBooking(bookingId)}
                        />
                    </Modal.Window>
                </Menus.Menu>
            </Modal>
        </Table.Row>
    );
}

export default BookingRow;

// prop-types
BookingRow.propTypes = {
    booking: PropTypes.shape({
        id: PropTypes.number,
        created_at: PropTypes.string,
        startDate: PropTypes.string,
        endDate: PropTypes.string,
        numNights: PropTypes.number,
        numGuests: PropTypes.number,
        totalPrice: PropTypes.number,
        status: PropTypes.string,
        guests: PropTypes.shape({
            fullName: PropTypes.string,
            email: PropTypes.string,
        }),
        cabins: PropTypes.shape({
            name: PropTypes.string,
        }),
    }),
};
