import PropTypes from 'prop-types';
import { createContext, useContext } from 'react';
import styled from 'styled-components';

const StyledTable = styled.div`
    border: 1px solid var(--color-grey-200);

    font-size: 1.4rem;
    background-color: var(--color-grey-0);
    border-radius: 7px;
    overflow: hidden;
`;

const CommonRow = styled.div`
    display: grid;
    grid-template-columns: ${(props) =>
        props.columns}; // определяем шаблон сетки через props
    column-gap: 2.4rem;
    align-items: center;
    transition: none;
`;

const StyledHeader = styled(CommonRow)`
    padding: 1.6rem 2.4rem;

    background-color: var(--color-grey-50);
    border-bottom: 1px solid var(--color-grey-100);
    text-transform: uppercase;
    letter-spacing: 0.4px;
    font-weight: 600;
    color: var(--color-grey-600);
`;

const StyledRow = styled(CommonRow)`
    padding: 1.2rem 2.4rem;

    &:not(:last-child) {
        border-bottom: 1px solid var(--color-grey-100);
    }
`;

const StyledBody = styled.section`
    margin: 0.4rem 0;
`;

const Footer = styled.footer`
    background-color: var(--color-grey-50);
    display: flex;
    justify-content: center;
    padding: 1.2rem;

    /* Это скроет footer, если он не содержит дочерних элементов. Возможно благодаря родительскому селектору :has 🎉 */
    &:not(:has(*)) {
        display: none;
    }
`;

const Empty = styled.p`
    font-size: 1.6rem;
    font-weight: 500;
    text-align: center;
    margin: 2.4rem;
`;

// 1. Создаем контекст
const TableContext = createContext();

// 2. Создаем родительский компонент
function Table({ columns, children }) {
    return (
        // columns передаем в CabinTable компоненту Table
        <TableContext.Provider value={{ columns }}>
            <StyledTable role="table">{children}</StyledTable>
        </TableContext.Provider>
    );
}

// 3. Создаем дочерние компоненты которые помогут реализовать основную задачу составного компонента (Compound Components Pattern)
function Header({ children }) {
    const { columns } = useContext(TableContext);

    return (
        <StyledHeader role="row" columns={columns} as="header">
            {children}
        </StyledHeader>
    );
}

function Row({ children }) {
    const { columns } = useContext(TableContext);

    return (
        <StyledRow role="row" columns={columns}>
            {children}
        </StyledRow>
    );
}

function Body({ children }) {}

// 4. Добавляем дочерние компоненты в качестве свойств к родительскому компоненту
Table.Header = Header;
Table.Row = Row;
Table.Body = Body;
Table.Footer = Footer;

export default Table;

Table.propTypes = {
    columns: PropTypes.string,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
    ]).isRequired,
};

Header.propTypes = {
    children: PropTypes.node.isRequired,
};

Row.propTypes = {
    children: PropTypes.node.isRequired,
};

Body.propTypes = {
    children: PropTypes.node.isRequired,
};
