import styled from 'styled-components';

import LoginForm from '../features/authentication/LoginForm';
import Logo from '../ui/Logo';
import Heading from '../ui/Heading';

// --- styled components --- //
const LoginLayout = styled.main`
    min-height: 100vh;
    display: grid;
    grid-template-columns: 48rem;
    align-content: center;
    justify-content: center;
    gap: 3.2rem;
    background-color: var(--color-grey-50);
`;

// --- components --- //
function Login() {
    return (
        <LoginLayout>
            {/* Логотип */}
            <Logo />

            {/* Заголовок */}
            <Heading as="h4">Log in to your account</Heading>

            {/* Форма входа */}
            <LoginForm />
        </LoginLayout>
    );
}

export default Login;
