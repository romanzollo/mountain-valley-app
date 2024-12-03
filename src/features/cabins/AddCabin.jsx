import { useState } from 'react';

import Button from '../../ui/Button';
import Modal from '../../ui/Modal';
import CreateCabinForm from './CreateCabinForm';

function AddCabin() {
    // создаем локальное состояние для отображения формы
    const [isOpenModal, setIsOpenModal] = useState(false);

    return (
        <div>
            <Button onClick={() => setIsOpenModal((show) => !show)}>
                Add new cabin
            </Button>

            {/* отображаем форму если isOpenModal = true */}
            {isOpenModal && (
                <Modal onClose={() => setIsOpenModal(false)}>
                    <CreateCabinForm
                        onCloseModal={() => setIsOpenModal(false)}
                    />
                </Modal>
            )}
        </div>
    );
}

export default AddCabin;
