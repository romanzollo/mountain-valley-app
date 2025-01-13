import styled from 'styled-components';

import { useDarkMode } from '../hooks/useDarkMode';

// --- styled components --- //
const StyledLogo = styled.div`
    text-align: center;
`;

const Img = styled.img`
    /* height: 9.6rem; */
    height: 10rem;
    width: auto;
`;

// --- components --- //
function Logo() {
    // получаем состояние темы
    const { isDarkMode } = useDarkMode();

    // формируем ссылку на изображение в зависимости от темы
    const src = isDarkMode ? '/logo-dark.png' : '/logo-light.png';

    return (
        <StyledLogo>
            <Img src={src} alt="Logo" />
        </StyledLogo>
    );
}

export default Logo;
