import { useEffect } from 'react';

import Heading from '../ui/Heading';
import Row from '../ui/Row';

import { getCabins } from '../services/apiCabins';

function Cabins() {
    // использовать useEffect с побочными эффектами неправильно но ради эксперимента попробуем)
    useEffect(() => {
        getCabins().then((data) => console.log(data));
    }, []);

    return (
        <Row type="horizontal">
            <Heading as="h1">All cabins</Heading>
            <p>TEST</p>
        </Row>
    );
}

export default Cabins;
