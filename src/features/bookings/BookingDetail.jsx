import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { HiArrowUpOnSquare } from 'react-icons/hi2';

import BookingDataBox from './BookingDataBox';
import Row from '../../ui/Row';
import Heading from '../../ui/Heading';
import Tag from '../../ui/Tag';
import ButtonGroup from '../../ui/ButtonGroup';
import Button from '../../ui/Button';
import ButtonText from '../../ui/ButtonText';
import Spinner from '../../ui/Spinner';
import ConfirmDelete from '../../ui/ConfirmDelete';
import Modal from '../../ui/Modal';
import Empty from '../../ui/Empty';

import { useMoveBack } from '../../hooks/useMoveBack';
import { useBooking } from './useBooking';
import { useCheckout } from '../check-in-out/useCheckout';
import { useDeleteBooking } from './useDeleteBooking';

// --- styled-components --- //
const HeadingGroup = styled.div`
    display: flex;
    gap: 2.4rem;
    align-items: center;
`;

// --- components --- //
function BookingDetail() {
    // получаем данные из кеша React Query с помощью кастомного хука
    const { booking, isLoading } = useBooking();

    // получаем функцию для изменения статуса бронирования на checked-out
    const { checkOut, isCheckOutLoading } = useCheckout();

    // используем кастомный хук для удаления бронирования
    const { deleteBooking, isDeleting } = useDeleteBooking();

    const navigate = useNavigate();

    // получаем функцию для перехода назад
    const moveBack = useMoveBack();

    // показываем компонент Spinner если данные загружаются
    if (isLoading) return <Spinner />;
    // если массив bookings пустой, то отображаем компонент Empty
    if (!booking) return <Empty resourceName="booking" />;

    // получаем данные о бронировании
    const { status, id: bookingId } = booking;

    // определем цвет тега по статусу
    const statusToTagName = {
        unconfirmed: 'blue',
        'checked-in': 'green',
        'checked-out': 'silver',
    };

    return (
        <>
            <Row type="horizontal">
                <HeadingGroup>
                    <Heading as="h1">Booking №{bookingId}</Heading>
                    <Tag type={statusToTagName[status]}>
                        {status.replace('-', ' ')}
                    </Tag>
                </HeadingGroup>
                <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
            </Row>

            <BookingDataBox booking={booking} />

            <ButtonGroup>
                {/* показываемs кнопку Check in только если бронирование еще не подтверждено */}
                {status === 'unconfirmed' && (
                    <Button onClick={() => navigate(`/checkin/${bookingId}`)}>
                        Check in
                    </Button>
                )}

                <Modal>
                    {/* всплывающее окно для подтверждения удаления бронирования */}
                    <Modal.Open opens="delete">
                        <Button $variation="danger">Delete booking</Button>
                    </Modal.Open>

                    <Modal.Window name="delete">
                        {/* компонент всплывающего окна для подтверждения удаления */}
                        <ConfirmDelete
                            resourceName="booking"
                            disabled={isDeleting}
                            onConfirm={() =>
                                deleteBooking(bookingId, {
                                    // встроенный в React Query объект для настроек
                                    onSettled: () => navigate(-1), // перенаправляем пользователя на предыдущую страницу после удаления бронирования
                                })
                            }
                        />
                    </Modal.Window>
                </Modal>

                {/* показываем кнопку Check out только если бронирование уже подтверждено */}
                {status === 'checked-in' && (
                    <Button
                        $icon={<HiArrowUpOnSquare />}
                        onClick={() => checkOut(bookingId)}
                        disabled={isCheckOutLoading}
                    >
                        Check out
                    </Button>
                )}

                <Button $variation="secondary" onClick={moveBack}>
                    Back
                </Button>
            </ButtonGroup>
        </>
    );
}

export default BookingDetail;
