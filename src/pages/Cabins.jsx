import { useState } from 'react';

import CabinTable from '../features/cabins/CabinTable';
import Heading from '../ui/Heading';
import Row from '../ui/Row';
import Button from '../ui/Button';
import CreateCabinForm from '../features/cabins/CreateCabinForm';

function Cabins() {
    // создаем локальное состояние для отображения формы
    const [showForm, setShowForm] = useState(false);

    return (
        <>
            <Row type="horizontal">
                <Heading as="h1">All cabins</Heading>
                <p>Filter / Sort</p>
            </Row>

            <Row>
                <CabinTable />

                <Button onClick={() => setShowForm((show) => !show)}>
                    Add new cabin
                </Button>

                {/* отображаем форму если showForm = true */}
                {showForm && <CreateCabinForm />}
            </Row>
        </>
    );
}

export default Cabins;
