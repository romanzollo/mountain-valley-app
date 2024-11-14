import styled from 'styled-components';

import GlobalStyles from './styles/GlobalStyles';
import Button from './ui/Button';
import Input from './ui/Input';

const H1 = styled.h1`
    font-size: 30px;
    font-weight: 600;
    background-color: yellow;
`;

const StyledApp = styled.div`
    background-color: orangered;
    padding: 29px;
`;

function App() {
    return (
        <>
            {/* подключаем глобальные стили,
            GlobalStyles не может иметь никаких вложений (children) */}
            <GlobalStyles />
            {/* StyledApp вместо div компонента App - согласно документации
            Styled Components  */}
            <StyledApp>
                <H1>Wild Oasis</H1>
                <Button onClick={() => console.log('Clicked')}>Check in</Button>
                <Button onClick={() => console.log('Clicked')}>
                    Check out
                </Button>

                <Input type="number" placeholder="Number of guests" />
            </StyledApp>
        </>
    );
}

export default App;
