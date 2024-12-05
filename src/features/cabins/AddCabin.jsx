import Button from '../../ui/Button';
import Modal from '../../ui/Modal';
import CabinTable from './CabinTable';
import CreateCabinForm from './CreateCabinForm';

function AddCabin() {
    return (
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

            <Modal.Open opens="table">
                <Button>Show table</Button>
            </Modal.Open>
            <Modal.Window name="table">
                <CabinTable />
            </Modal.Window>
        </Modal>
    );
}

// function AddCabin() {
//     // создаем локальное состояние для отображения формы
//     const [isOpenModal, setIsOpenModal] = useState(false);

//     return (
//         <div>
//             <Button onClick={() => setIsOpenModal((show) => !show)}>
//                 Add new cabin
//             </Button>

//             {/* отображаем форму если isOpenModal = true */}
//             {isOpenModal && (
//                 <Modal onClose={() => setIsOpenModal(false)}>
//                     <CreateCabinForm
//                         onCloseModal={() => setIsOpenModal(false)}
//                     />
//                 </Modal>
//             )}
//         </div>
//     );
// }

export default AddCabin;
