import { createContext, useContext, useState } from 'react';
import { createPortal } from 'react-dom';
import { HiEllipsisVertical } from 'react-icons/hi2';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { useOutsideClick } from '../hooks/useOutsideClick';

const Menu = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
`;

const StyledToggle = styled.button`
    background: none;
    border: none;
    padding: 0.4rem;
    border-radius: var(--border-radius-sm);
    transform: translateX(0.8rem);
    transition: all 0.2s;

    &:hover {
        background-color: var(--color-grey-100);
    }

    & svg {
        width: 2.4rem;
        height: 2.4rem;
        color: var(--color-grey-700);
    }
`;

const StyledList = styled.ul`
    position: fixed;

    background-color: var(--color-grey-0);
    box-shadow: var(--shadow-md);
    border-radius: var(--border-radius-md);

    // координаты отображения меню в зависимости от позиции окна (position)
    right: ${(props) => props.$position.x}px;
    top: ${(props) => props.$position.y}px;
`;

const StyledButton = styled.button`
    width: 100%;
    text-align: left;
    background: none;
    border: none;
    padding: 1.2rem 2.4rem;
    font-size: 1.4rem;
    transition: all 0.2s;

    display: flex;
    align-items: center;
    gap: 1.6rem;

    &:hover {
        background-color: var(--color-grey-50);
    }

    & svg {
        width: 1.6rem;
        height: 1.6rem;
        color: var(--color-grey-400);
        transition: all 0.3s;
    }
`;

// 1. Создаем контекст
const MenusContext = createContext();

// 2. Создаем родительский компонент
function Menus({ children }) {
    // состояние для определения какое меню открыто
    const [openId, setOpenId] = useState('');
    // координаты отображения меню
    const [position, setPosition] = useState(0);

    // функции обработчики
    const close = () => setOpenId('');
    const open = (id) => setOpenId(id);

    return (
        <MenusContext.Provider
            value={{ openId, close, open, position, setPosition }}
        >
            {children}
        </MenusContext.Provider>
    );
}

// 3. Создаем дочерние компоненты которые помогут реализовать основную задачу составного компонента (Compound Components Pattern)
function Toggle({ id }) {
    // получаем доступ к функциям и состоянию из контекста
    const { open, close, openId, setPosition } = useContext(MenusContext);

    function handleClick(e) {
        // предотвращает дальнейшее всплытие события вверх по DOM дереву (устраняем баг - не закрывается меню при клике на кнопку меню)
        e.stopPropagation();

        // получаем координаты кнопки которая была кликнута
        const rect = e.target.closest('button').getBoundingClientRect();
        // устанавливаем координаты кнопки в состояние
        setPosition({
            // расчитываем координаты для отображения меню
            x: window.innerWidth - rect.width - rect.x,
            y: rect.y + rect.height + 8,
        });

        // если id отсутствует или открыто другое меню, то открываем нужное
        openId === '' || openId !== id ? open(id) : close();
    }

    return (
        <StyledToggle onClick={(e) => handleClick(e)}>
            <HiEllipsisVertical />
        </StyledToggle>
    );
}

function List({ id, children }) {
    // получаем доступ к контексту
    const { openId, position, close } = useContext(MenusContext);

    // создаем реф который будет следить за кликами вне меню и закрывать его
    const ref = useOutsideClick(() => close(), false); // false - обработчик срабатывает только на этапе погружения (устраняем баг - не закрывается меню при клике на кнопку меню)

    // если id не равен id открытому меню, то возвращаем null
    if (openId !== id) return null;

    // используем Portal чтобы отобразить меню в поверх всего UI приложения для избежания возможных проблем с overflow: hidden
    return createPortal(
        // position props - координаты отображения меню
        <StyledList $position={position} ref={ref}>
            {children}
        </StyledList>,
        document.body
    );
}

function Button({ children, icon, onClick }) {
    // получаем доступ к контексту
    const { close } = useContext(MenusContext);

    function handleClick() {
        // вызываем обработчик
        onClick?.();
        // закрываем меню
        close();
    }

    return (
        // li - так как кнопка внутри ul
        <li>
            <StyledButton onClick={handleClick}>
                {icon}
                <span>{children}</span>{' '}
            </StyledButton>
        </li>
    );
}

// 4. Добавляем дочерние компоненты в качестве свойств к родительскому компоненту
Menus.Menu = Menu;
Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;

export default Menus;

// PropsTypes
Menus.propTypes = {
    children: PropTypes.node.isRequired,
};

Toggle.propTypes = {
    id: PropTypes.number.isRequired,
};

List.propTypes = {
    id: PropTypes.number.isRequired,
    children: PropTypes.node.isRequired,
};

Button.propTypes = {
    children: PropTypes.string.isRequired,
    icon: PropTypes.node,
    onClick: PropTypes.func,
};
