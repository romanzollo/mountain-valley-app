import propTypes from 'prop-types';

import Button from '../../ui/Button';

import { useCheckout } from './useCheckout';

function CheckoutButton({ bookingId }) {
    // получаем функцию из кастомного хука для изменения статуса бронирования на checked-out
    const { checkOut, isCheckOutLoading } = useCheckout();

    return (
        <Button
            $variation="primary"
            size="small"
            onClick={() => checkOut(bookingId)}
            disabled={isCheckOutLoading}
        >
            Check out
        </Button>
    );
}

export default CheckoutButton;

// --- prop-types --- //
CheckoutButton.propTypes = {
    bookingId: propTypes.number.isRequired,
};
