import { useSearchParams } from 'react-router-dom';
import PropTypes from 'prop-types';

import Select from './Select';

function SortBy({ options }) {
    const [searchParams, setSearchParams] = useSearchParams();

    // получаем текущее значение сортировки
    const currentSort = searchParams.get('sortBy') || '';

    // функция для определения какой параметр сортировки выбран
    function handleChange(e) {
        // устанавливает параметры в URL
        searchParams.set('sortBy', e.target.value);

        setSearchParams(searchParams);
    }

    return (
        <Select
            onChange={handleChange}
            options={options}
            value={currentSort}
            type="white" // определяет цвет бордера
        />
    );
}

export default SortBy;

// prop-types
SortBy.propTypes = {
    options: PropTypes.arrayOf(
        PropTypes.shape({
            value: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired,
        })
    ).isRequired,
};
