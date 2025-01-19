import styled from 'styled-components';
import PropTypes from 'prop-types';

import Heading from './Heading';
import GlobalStyles from '../styles/GlobalStyles';
import Button from './Button';

// --- styled components --- //
const StyledErrorFallback = styled.main`
    height: 100vh;
    background-color: var(--color-grey-50);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 4.8rem;
`;

const Box = styled.div`
    /* Box */
    background-color: var(--color-grey-0);
    border: 1px solid var(--color-grey-100);
    border-radius: var(--border-radius-md);

    padding: 4.8rem;
    flex: 0 1 96rem;
    text-align: center;

    & h1 {
        margin-bottom: 1.6rem;
    }

    & p {
        font-family: 'Sono';
        margin-bottom: 3.2rem;
        color: var(--color-grey-500);
    }
`;

// --- component --- //
function ErrorFallback({ error, resetErrorBoundary }) {
    return (
        <>
            {/* Добавляем глобальные стили */}
            <GlobalStyles />

            <StyledErrorFallback>
                <Box>
                    {/* Заголовок */}
                    <Heading as="h1">Something went wrong 😥</Heading>
                    {/* Описание ошибки */}
                    <p>{error.message}</p>

                    {/* Кнопка для перехода на главную страницу */}
                    <Button size="large" onClick={resetErrorBoundary}>
                        Back to homepage
                    </Button>
                </Box>
            </StyledErrorFallback>
        </>
    );
}

export default ErrorFallback;

// --- propTypes --- //
ErrorFallback.propTypes = {
    error: PropTypes.instanceOf(Error).isRequired,
    resetErrorBoundary: PropTypes.func.isRequired,
};
