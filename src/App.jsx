import styled from 'styled-components';

import GlobalStyles from './styles/GlobalStyles';
import Button from './ui/Button';
import Input from './ui/Input';
import Heading from './ui/Heading';

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
                {/* props as - указывает какой тег будет использоваться */}
                <Heading as="h1">Wild Oasis</Heading>

                {/* props as - указывает какой тег будет использоваться */}
                <Heading as="h2">Check in and out</Heading>
                <Button onClick={() => console.log('Clicked')}>Check in</Button>
                <Button onClick={() => console.log('Clicked')}>
                    Check out
                </Button>

                {/* props as - указывает какой тег будет использоваться */}
                <Heading as="h3">Form</Heading>

                <Input type="number" placeholder="Number of guests" />
            </StyledApp>
        </>
    );
}

export default App;
