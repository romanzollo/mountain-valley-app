import { HiChevronLeft, HiChevronRight } from 'react-icons/hi2';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { PAGE_SIZE } from '../utils/constants';

const StyledPagination = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const P = styled.p`
    font-size: 1.4rem;
    margin-left: 0.8rem;

    & span {
        font-weight: 600;
    }
`;

const Buttons = styled.div`
    display: flex;
    gap: 0.6rem;
`;

const PaginationButton = styled.button`
    background-color: ${(props) =>
        props.active ? ' var(--color-brand-600)' : 'var(--color-grey-50)'};
    color: ${(props) => (props.active ? ' var(--color-brand-50)' : 'inherit')};
    border: none;
    border-radius: var(--border-radius-sm);
    font-weight: 500;
    font-size: 1.4rem;

    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.4rem;
    padding: 0.6rem 1.2rem;
    transition: all 0.3s;

    &:has(span:last-child) {
        padding-left: 0.4rem;
    }

    &:has(span:first-child) {
        padding-right: 0.4rem;
    }

    & svg {
        height: 1.8rem;
        width: 1.8rem;
    }

    &:hover:not(:disabled) {
        background-color: var(--color-brand-600);
        color: var(--color-brand-50);
    }
`;

function Pagination({ count }) {
    // используем хук useSearchParams для получения и изменения параметров URL
    const [searchParams, setSearchParams] = useSearchParams();

    // --- получаем текущую страницу --- //
    // проверяем есть ли параметр page в URL и если его нет, то устанавливаем 1 страницу
    const currentPage = !searchParams.get('page')
        ? 1
        : Number(searchParams.get('page')); // переводим в число

    // вычисляем количество страниц
    const pageCount = Math.ceil(count / PAGE_SIZE);

    function nextPage() {
        // проверяем есть ли следующая страница
        const next = currentPage === pageCount ? pageCount : currentPage + 1;

        // формируем и обновляем параметры URL
        searchParams.set('page', next);
        // устанавливаем параметры в URL
        setSearchParams(searchParams);
    }

    function prevPage() {
        // проверяем есть ли предыдущая страница
        const prev = currentPage === 1 ? currentPage : currentPage - 1;

        // формируем и обновляем параметры URL
        searchParams.set('page', prev);
        // устанавливаем параметры в URL
        setSearchParams(searchParams);
    }

    // если колличество страниц меньше или равно 1, то не показываем пагинацию
    if (pageCount <= 1) return null;

    return (
        <StyledPagination>
            <P>
                Showing <span>{(currentPage - 1) * PAGE_SIZE + 1}</span> to{' '}
                <span>
                    {/* если мы на последней странице, то показываем количество всех страниц */}
                    {currentPage === pageCount
                        ? count
                        : currentPage * PAGE_SIZE}
                </span>{' '}
                of <span>{count}</span> results
            </P>

            <Buttons>
                <PaginationButton
                    onClick={prevPage}
                    disabled={currentPage === 1}
                >
                    <HiChevronLeft />
                    <span>Previous</span>
                </PaginationButton>

                <PaginationButton
                    onClick={nextPage}
                    disabled={currentPage === pageCount}
                >
                    <span>Next</span>
                    <HiChevronRight />
                </PaginationButton>
            </Buttons>
        </StyledPagination>
    );
}

export default Pagination;

Pagination.propTypes = {
    count: PropTypes.number.isRequired,
};
