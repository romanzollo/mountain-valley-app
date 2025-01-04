import styled from 'styled-components';

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
    return (
        <StyledLogo>
            <Img src="/logo-light.png" alt="Logo" />
        </StyledLogo>
    );
}

export default Logo;
