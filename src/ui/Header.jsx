import styled from 'styled-components';

import HeaderMenu from './HeaderMenu';
import UserAvatar from '../features/authentication/UserAvatar';

// --- styled components --- //
const StyledHeader = styled.header`
    background-color: var(--color-grey-0);
    padding: 1.2rem 4.8rem;
    border-bottom: 1px solid var(--color-grey-100);

    // выравниваем аватар. меню и кнопку выхода по правому краю
    display: flex;
    gap: 2.4rem;
    align-items: center;
    justify-content: flex-end;
`;

// --- components --- //
function Header() {
    return (
        <StyledHeader>
            <UserAvatar />

            <HeaderMenu />
        </StyledHeader>
    );
}

export default Header;
