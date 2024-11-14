import styled from 'styled-components';

import GlobalStyles from './styles/GlobalStyles';
import Button from './ui/Button';
import Input from './ui/Input';
import Heading from './ui/Heading';
import Row from './ui/Row';

const StyledApp = styled.div`
    /* background-color: orangered; */
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
                <Row>
                    <Row type="horizontal">
                        {/* props as - указывает какой тег будет использоваться */}
                        <Heading as="h1">Wild Oasis</Heading>

                        <div>
                            {/* props as - указывает какой тег будет использоваться */}
                            <Heading as="h2">Check in and out</Heading>
                            <Button onClick={() => console.log('Clicked')}>
                                Check in
                            </Button>
                            <Button
                                variation="secondary"
                                size="small"
                                onClick={() => console.log('Clicked')}
                            >
                                Check out
                            </Button>
                        </div>
                    </Row>

                    <Row>
                        {/* props as - указывает какой тег будет использоваться */}
                        <Heading as="h3">Form</Heading>

                        <form>
                            <Input
                                type="number"
                                placeholder="Number of guests"
                            />
                            <Input
                                type="number"
                                placeholder="Number of guests"
                            />
                        </form>
                    </Row>
                </Row>
            </StyledApp>
        </>
    );
}

export default App;
