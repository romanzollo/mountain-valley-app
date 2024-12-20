import styled from 'styled-components';

const Tag = styled.span`
    width: fit-content;
    text-transform: uppercase;
    font-size: 1.1rem;
    font-weight: 600;
    padding: 0.4rem 1.2rem;
    border-radius: 100px;

    /* делаем их динамичными, основываясь на полученном prop из компонента BookingRow (green, blue, silver) */
    color: var(--color-${(props) => props.type}-700);
    background-color: var(--color-${(props) => props.type}-100);
`;

export default Tag;
