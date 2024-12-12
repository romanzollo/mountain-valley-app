import { useSearchParams } from 'react-router-dom';

import Spinner from '../../ui/Spinner';
import CabinRow from './CabinRow';
import { useCabin } from './useCabin';
import Table from '../../ui/Table';
import Menus from '../../ui/Menus';

function CabinTable() {
    // используем кастомный хук для получения данных из API
    const { cabins, isLoading } = useCabin();

    // получаем данные параметров из URL
    const [searchParams] = useSearchParams();

    if (isLoading) return <Spinner />;

    // получаем текущее значение фильтра
    const filterValue = searchParams.get('discount') || 'all'; // all значение по умолчанию

    // фильтруем данные
    let filteredCabins;
    if (filterValue === 'all') filteredCabins = cabins;
    if (filterValue === 'with-discount')
        filteredCabins = cabins.filter((cabin) => cabin.discount > 0);
    if (filterValue === 'no-discount')
        filteredCabins = cabins.filter((cabin) => cabin.discount === 0);

    return (
        /* оборачиваем все содержимое в компонент Menus чтобы отслеживать какое меню открыто */
        <Menus>
            {/*  передаем значение columns в компонент Table чтобы использовать
            эти значения во всех его дочерних компонентах (reusable components) */}
            <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
                <Table.Header>
                    <div></div>
                    <div>Cabin</div>
                    <div>Capacity</div>
                    <div>Price</div>
                    <div>Discount</div>
                    <div></div>
                </Table.Header>

                {/* Render Props Pattern */}
                <Table.Body
                    data={filteredCabins}
                    render={(cabin) => (
                        <CabinRow key={cabin.id} cabin={cabin} />
                    )}
                />
            </Table>
        </Menus>
    );
}

export default CabinTable;
