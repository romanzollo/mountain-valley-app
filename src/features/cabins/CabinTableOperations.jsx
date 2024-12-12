import TableOperations from '../../ui/TableOperations';
import Filter from '../../ui/Filter';

function CabinTableOperations() {
    // изменяя в будущем FilterField и Options мы можем переиспользовать компонент Filter
    return (
        <TableOperations>
            <Filter
                filterField="discount"
                // передаем список опций в компонент Filter
                options={[
                    { value: 'all', label: 'All' },
                    { value: 'no-discount', label: 'No discount' },
                    { value: 'with-discount', label: 'With discount' },
                ]}
            />
        </TableOperations>
    );
}

export default CabinTableOperations;
