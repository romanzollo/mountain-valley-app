import SortBy from '../../ui/SortBy';
import Filter from '../../ui/Filter';
import TableOperations from '../../ui/TableOperations';

function BookingTableOperations() {
    return (
        <TableOperations>
            {/* Фильтрация */}
            <Filter
                // filterField - имя состояния которое записывается в URL
                filterField="status"
                // передаем список опций в компонент Filter
                options={[
                    { value: 'all', label: 'All' },
                    { value: 'checked-out', label: 'Checked out' },
                    { value: 'checked-in', label: 'Checked in' },
                    { value: 'unconfirmed', label: 'Unconfirmed' },
                ]}
            />

            {/* Сортировка */}
            <SortBy
                // value: startDate, totalPrice - соответствуют полям бэка в Superbase (по этим значениям мы и будем сортировать отделив "-" через split('-'))
                // asc - по возрастанию, desc - по убыванию: отделим через split('-') в компоненте BookingTable
                options={[
                    {
                        value: 'startDate-desc', // по дате
                        label: 'Sort by date (later to earlier)',
                    },
                    {
                        value: 'startDate-asc', // по дате
                        label: 'Sort by date (earlier to later)',
                    },
                    {
                        value: 'totalPrice-desc', // по цене
                        label: 'Sort by amount (high to low)',
                    },
                    {
                        value: 'totalPrice-asc', // по цене
                        label: 'Sort by amount (low to high)',
                    },
                ]}
            />
        </TableOperations>
    );
}

export default BookingTableOperations;
