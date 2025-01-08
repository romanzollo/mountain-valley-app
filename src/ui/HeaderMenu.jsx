import { useNavigate } from 'react-router-dom';
import { HiOutlineUser } from 'react-icons/hi2';
import styled from 'styled-components';

import Logout from '../features/authentication/Logout';
import ButtonIcon from './ButtonIcon';

// --- styled components --- //
const StyledHeaderMenu = styled.ul`
    display: flex;
    gap: 0.4rem;
`;

// --- components --- //
function HeaderMenu() {
    // создаем функцию для навигации
    const navigate = useNavigate();

    return (
        <StyledHeaderMenu>
            {/* создаем кнопку для перехода на страницу профиля  */}
            <li>
                <ButtonIcon onClick={() => navigate('/account')}>
                    <HiOutlineUser />
                </ButtonIcon>
            </li>

            {/* создаем кнопку для выхода */}
            <li>
                <Logout />
            </li>
        </StyledHeaderMenu>
    );
}

export default HeaderMenu;
