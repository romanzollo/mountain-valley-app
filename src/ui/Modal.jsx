import styled from 'styled-components';
import PropTypes from 'prop-types';
import { HiXMark } from 'react-icons/hi2';
import { createPortal } from 'react-dom';
import { cloneElement, createContext, useContext, useState } from 'react';

const StyledModal = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: var(--color-grey-0);
    border-radius: var(--border-radius-lg);
    box-shadow: var(--shadow-lg);
    padding: 3.2rem 4rem;
    transition: all 0.5s;
`;

const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background-color: var(--backdrop-color);
    backdrop-filter: blur(4px);
    z-index: 1000;
    transition: all 0.5s;
`;

const Button = styled.button`
    background: none;
    border: none;
    padding: 0.4rem;
    border-radius: var(--border-radius-sm);
    transform: translateX(0.8rem);
    transition: all 0.2s;
    position: absolute;
    top: 1.2rem;
    right: 1.9rem;

    &:hover {
        background-color: var(--color-grey-100);
    }

    & svg {
        width: 2.4rem;
        height: 2.4rem;
        /* Sometimes we need both */
        /* fill: var(--color-grey-500);
    stroke: var(--color-grey-500); */
        color: var(--color-grey-500);
    }
`;

// 1. Создаем контекст
const ModalContext = createContext();

// 2. Создаем родительский компонент
function Modal({ children }) {
    // отслеживаем какое окно открыто в данный момент
    const [openName, setOpenName] = useState('');

    // функции обработчики
    const close = () => setOpenName('');
    const open = (name) => setOpenName(name);

    return (
        <ModalContext.Provider value={{ close, open, openName }}>
            {children}
        </ModalContext.Provider>
    );
}

// 3. Создаем дочерние компоненты которые помогут реализовать основную задачу составного компонента (Compound Components Pattern)
function Open({ children, opens: opensWindowName }) {
    // получаем доступ к функции open из контекста
    const { open } = useContext(ModalContext);

    // используем cloneElement чтобы передать дополнительные свойства (onClick) - обработчик события открытия модального окна для Button
    return cloneElement(children, { onClick: () => open(opensWindowName) });
}

function Window({ children, name }) {
    // достаем из контекста openName и функции для его закрытия
    const { close, openName } = useContext(ModalContext);

    // проверяем какое окно открыто(в state компонента Modal), если имена совпадают то отображаем его содержимое
    if (name !== openName) return null;

    // react portal - первый аргумент (child) — это любой React-компонент, который может быть отрендерен, такой как элемент, строка или фрагмент. Следующий аргумент (container) — это DOM-элемент внутри которого будет отрендерен child.
    // основное применение react portal - это решение проблемы повторного использования компонента в разных местах приложения где установленно значение overflow: hidden в родительском компоненте которое будет обрезать наш компонент
    return createPortal(
        <Overlay>
            <StyledModal>
                <Button onClick={close}>
                    <HiXMark />
                </Button>

                {/* передаем функцию закрытия onCloseModal в компонент children через cloneElement, т.к. в компоненте CreateCabinForm  
                в форме в зависимости от наличия onCloseModal выбираем тип отображения стиля 'modal' или 'regular'  */}
                <div>{cloneElement(children, { onCloseModal: close })}</div>
            </StyledModal>
        </Overlay>,
        document.body
    );
}

// 4. Добавляем дочерние компоненты в качестве свойств к родительскому компоненту
Modal.Open = Open;
Modal.Window = Window;

export default Modal;

Modal.propTypes = {
    children: PropTypes.node.isRequired,
};

Open.propTypes = {
    children: PropTypes.node.isRequired,
    opens: PropTypes.string.isRequired,
};

Window.propTypes = {
    children: PropTypes.node.isRequired,
    name: PropTypes.string.isRequired,
};
