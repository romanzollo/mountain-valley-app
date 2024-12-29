import { useSearchParams } from 'react-router-dom';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

const StyledFilter = styled.div`
    border: 1px solid var(--color-grey-100);
    background-color: var(--color-grey-0);
    box-shadow: var(--shadow-sm);
    border-radius: var(--border-radius-sm);
    padding: 0.4rem;
    display: flex;
    gap: 0.4rem;
`;

const FilterButton = styled.button`
    background-color: var(--color-grey-0);
    border: none;

    // active - активное состояние
    ${(props) =>
        props.active &&
        css`
            background-color: var(--color-brand-600);
            color: var(--color-brand-50);
        `}

    border-radius: var(--border-radius-sm);
    font-weight: 500;
    font-size: 1.4rem;
    /* To give the same height as select */
    padding: 0.44rem 0.8rem;
    transition: all 0.3s;

    &:hover:not(:disabled) {
        background-color: var(--color-brand-600);
        color: var(--color-brand-50);
    }
`;

// filterField - имя состояния которое записывается в URL, options - массив объектов { value: 'no-discount', label: 'No discount' } - передаем из CabinTableOperations
function Filter({ filterField, options }) {
    // useSearchParams - получить и установить значения в URL
    const [searchParams, setSearchParams] = useSearchParams();
    // получаем текущее значение фильтра чтобы в дальнейшем при перезагрузке страницы не убрать активное состояние
    const currentFilter = searchParams.get(filterField) || options[0].value;

    function handleClick(value) {
        // 'discount' - имя состояния которое записывается в URL, 'value' - значение которое записывается в URL (discount=no-discount или discount=with-discount и т.д.)
        searchParams.set(filterField, value);

        // всякий раз когда переключаем новый фильтр устанавливаем в URL параметр page(страница пагинации) на 1 - чтобы избежать ошибки когда например пагинация на 3 странице а при переключении фильтра у нас всего 1 страница пагинации так как данных совсем не много. То есть если останется в URL параметр page(страница пагинации) так же на 3 то будет ошибка!!!
        if (searchParams.get('page')) searchParams.set('page', 1);

        // устанавливает параметры в URL
        setSearchParams(searchParams);
    }

    return (
        <StyledFilter>
            {/* делаем компонент многоразовым для повторного использования (reusable components pattern)
            поэтому передаем все данные через пропсы которые могут поменяться */}
            {options.map((option) => (
                <FilterButton
                    key={option.value}
                    onClick={() => handleClick(option.value)}
                    // подсвечиваем активное состояние фильтра с помощью active (FilterButton => props => active)
                    active={
                        // fixed error (Received `true` for a non-boolean attribute `active`)
                        currentFilter === option.value
                            ? currentFilter.toString()
                            : undefined
                    }
                    // делаем текущую кнопку фильтра некликабельной
                    disabled={currentFilter === option.value}
                >
                    {option.label}
                </FilterButton>
            ))}
        </StyledFilter>
    );
}

export default Filter;

Filter.propTypes = {
    filterField: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(
        PropTypes.shape({
            value: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired,
        })
    ).isRequired,
};
