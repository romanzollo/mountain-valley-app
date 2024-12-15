import { useSearchParams } from 'react-router-dom';

import Spinner from '../../ui/Spinner';
import CabinRow from './CabinRow';
import { useCabins } from './useCabins';
import Table from '../../ui/Table';
import Menus from '../../ui/Menus';
import Empty from '../../ui/Empty';

function CabinTable() {
    // используем кастомный хук для получения данных из API
    const { cabins, isLoading } = useCabins();

    // получаем данные параметров из URL
    const [searchParams] = useSearchParams();

    // показываем компонент Spinner если данные загружаются
    if (isLoading) return <Spinner />;

    // если массив cabins пустой, то отображаем компонент Empty
    if (!cabins.length) return <Empty resourceName="cabins" />;

    // получаем текущее значение фильтра
    const filterValue = searchParams.get('discount') || 'all'; // all значение по умолчанию

    /* ФИЛЬТРАЦИЯ */
    let filteredCabins;
    if (filterValue === 'all') filteredCabins = cabins;
    if (filterValue === 'with-discount')
        filteredCabins = cabins.filter((cabin) => cabin.discount > 0);
    if (filterValue === 'no-discount')
        filteredCabins = cabins.filter((cabin) => cabin.discount === 0);

    /* СОРТИРОВКА*/
    const sortBy = searchParams.get('sortBy') || 'startDate-asc'; // startDate-asc значение по умолчанию

    // разбиваем строку на два значения (имя значения и направление сортировки)
    const [sortName, direction] = sortBy.split('-');
    // определяем модификатор исходя из значения направления, если направление 'asc' то 1, если 'desc' то -1
    const modifier = direction === 'asc' ? 1 : -1;
    // сортируем данные
    const sortedCabins = filteredCabins.sort(
        (a, b) => (a[sortName] - b[sortName]) * modifier
    ); // умножаем на модификатор чтобы изменить порядок сортировки

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
                    // data={filteredCabins}
                    data={sortedCabins}
                    render={(cabin) => (
                        <CabinRow key={cabin.id} cabin={cabin} />
                    )}
                />
            </Table>
        </Menus>
    );
}

export default CabinTable;
