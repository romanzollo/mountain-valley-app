import TableOperations from '../../ui/TableOperations';
import Filter from '../../ui/Filter';
import SortBy from '../../ui/SortBy';

function CabinTableOperations() {
    // изменяя в будущем FilterField и Options мы можем переиспользовать компонент Filter
    return (
        <TableOperations>
            {/* Фильтрация */}
            <Filter
                // filterField - имя состояния которое записывается в URL
                filterField="discount"
                // передаем список опций в компонент Filter
                options={[
                    { value: 'all', label: 'All' },
                    { value: 'no-discount', label: 'No discount' },
                    { value: 'with-discount', label: 'With discount' },
                ]}
            />

            {/* Сортировка */}
            <SortBy
                // value: name, regularPrice, maxCapacity - соответствуют полям бэка в Superbase (по этим значениям мы и будем сортировать отделив "-" через split('-'))
                // asc - по возрастанию, desc - по убыванию: отделим через split('-') в компоненте CabinTable
                options={[
                    { value: 'name-asc', label: 'Sort by name (A-Z)' }, // по имени в алфавитном порядке
                    { value: 'name-desc', label: 'Sort by name (Z-A)' }, // по имени в обратном алфавитном порядке
                    {
                        value: 'regularPrice-asc', // по цене
                        label: 'Sort by price (low to high)',
                    },
                    {
                        value: 'regularPrice-desc', // по цене
                        label: 'Sort by price (high to low)',
                    },
                    {
                        value: 'maxCapacity-asc', // по вместимости
                        label: 'Sort by capacity (low to high)',
                    },
                    {
                        value: 'maxCapacity-desc', // по вместимости
                        label: 'Sort by capacity (high to low)',
                    },
                ]}
            />
        </TableOperations>
    );
}

export default CabinTableOperations;
