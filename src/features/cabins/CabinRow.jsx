import { HiPencil, HiSquare2Stack, HiTrash } from 'react-icons/hi2';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import CreateCabinForm from './CreateCabinForm';

import { formatCurrency } from '../../utils/helpers';
import { useDeleteCabin } from './useDeleteCabin';
import { useCreateCabin } from './useCreateCabin';

import Modal from '../../ui/Modal';
import ConfirmDelete from '../../ui/ConfirmDelete';
import Table from '../../ui/Table';
import Menus from '../../ui/Menus';

// const TableRow = styled.div`
//     display: grid;
//     grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
//     column-gap: 2.4rem;
//     align-items: center;
//     padding: 1.4rem 2.4rem;

//     &:not(:last-child) {
//         border-bottom: 1px solid var(--color-grey-100);
//     }
// `;

const Img = styled.img`
    display: block;
    width: 6.4rem;
    aspect-ratio: 3 / 2;
    object-fit: cover;
    object-position: center;
    transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
    font-size: 1.6rem;
    font-weight: 600;
    color: var(--color-grey-600);
    font-family: 'Sono';
`;

const Price = styled.div`
    font-family: 'Sono';
    font-weight: 600;
`;

const Discount = styled.div`
    font-family: 'Sono';
    font-weight: 500;
    color: var(--color-green-700);
`;

function CabinRow({ cabin }) {
    // используем кастомный хук для удаления хижины
    const { isDeleting, deleteCabin } = useDeleteCabin();

    // используем кастомный хук для создания новой хижины
    const { isCreating, createCabin } = useCreateCabin();

    const {
        id: cabinId,
        name,
        maxCapacity,
        regularPrice,
        discount,
        image,
        description,
    } = cabin;

    function handleDuplicate() {
        createCabin({
            name: `Copy of ${name}`,
            maxCapacity,
            regularPrice,
            discount,
            image,
            description,
        });
    }

    return (
        // TableRow компонента Table (reusable components)
        <Table.Row>
            <Img src={image} alt={name} />
            <Cabin>{name}</Cabin>
            <div>Fits up to {maxCapacity} guests</div>
            <Price>{formatCurrency(regularPrice)}</Price>
            {discount ? (
                <Discount>{formatCurrency(discount)}</Discount>
            ) : (
                <span>&mdash;</span>
            )}
            <div>
                <Modal>
                    <Menus.Menu>
                        {/* id - чтобы при нажатии на toggle открывать только нужное меню(соответствующее id) */}
                        <Menus.Toggle id={cabinId} />

                        <Menus.List id={cabinId}>
                            {/* кнопка Duplicate */}
                            <Menus.Button
                                icon={<HiSquare2Stack />}
                                onClick={handleDuplicate}
                                disabled={isCreating}
                            >
                                Duplicate
                            </Menus.Button>

                            {/* кнопка Edit */}
                            <Modal.Open opens="update">
                                <Menus.Button icon={<HiPencil />}>
                                    Edit
                                </Menus.Button>
                            </Modal.Open>

                            {/* кнопка Delete */}
                            <Modal.Open opens="delete">
                                <Menus.Button icon={<HiTrash />}>
                                    Delete
                                </Menus.Button>
                            </Modal.Open>
                        </Menus.List>

                        {/* всплывающие окна редактирования и удаления которые открываются при нажатии на кнопки Edit и Delete */}
                        <Modal.Window name="update">
                            <CreateCabinForm cabinToUpdate={cabin} />
                        </Modal.Window>

                        <Modal.Window name="delete">
                            <ConfirmDelete
                                resourceName="cabin"
                                disabled={isDeleting}
                                onConfirm={() => deleteCabin(cabinId)}
                            />
                        </Modal.Window>
                    </Menus.Menu>
                </Modal>
            </div>
        </Table.Row>
    );
}

export default CabinRow;

CabinRow.propTypes = {
    cabin: PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        maxCapacity: PropTypes.number,
        regularPrice: PropTypes.number,
        discount: PropTypes.number,
        image: PropTypes.string,
        description: PropTypes.string,
    }),
};
