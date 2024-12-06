import Button from '../../ui/Button';
import Modal from '../../ui/Modal';
import CreateCabinForm from './CreateCabinForm';

function AddCabin() {
    return (
        <div>
            <Modal>
                {/* Modal.Open - служит для гибкости компонента, чтобы не определять стиль кнопки и т.д. */}
                {/* opens - имя модального окна, которое будет открыто. */}
                <Modal.Open opens="cabin-form">
                    <Button>Add new cabin</Button>
                </Modal.Open>
                {/* связываем name в компоненте Window с opens в компоненте Modal.Open */}
                <Modal.Window name="cabin-form">
                    <CreateCabinForm />
                </Modal.Window>
            </Modal>
        </div>
    );
}

export default AddCabin;
