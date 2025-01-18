import styled from 'styled-components';
import {
    PieChart,
    Pie,
    ResponsiveContainer,
    Cell,
    Legend,
    Tooltip,
} from 'recharts';
import PropTypes from 'prop-types';

import Heading from '../../ui/Heading';

import { useDarkMode } from '../../hooks/useDarkMode';

// --- styled components --- //
const ChartBox = styled.div`
    /* Box */
    background-color: var(--color-grey-0);
    border: 1px solid var(--color-grey-100);
    border-radius: var(--border-radius-md);

    padding: 2.4rem 3.2rem;
    grid-column: 3 / span 2;

    & > *:first-child {
        margin-bottom: 1.6rem;
    }

    & .recharts-pie-label-text {
        font-weight: 600;
    }
`;

// --- data --- //
const startDataLight = [
    {
        duration: '1 night', // ключ имени
        value: 0, // ключ данных
        color: '#ef4444',
    },
    {
        duration: '2 nights',
        value: 0,
        color: '#f97316',
    },
    {
        duration: '3 nights',
        value: 0,
        color: '#eab308',
    },
    {
        duration: '4-5 nights',
        value: 0,
        color: '#84cc16',
    },
    {
        duration: '6-7 nights',
        value: 0,
        color: '#22c55e',
    },
    {
        duration: '8-14 nights',
        value: 0,
        color: '#14b8a6',
    },
    {
        duration: '15-21 nights',
        value: 0,
        color: '#3b82f6',
    },
    {
        duration: '21+ nights',
        value: 0,
        color: '#a855f7',
    },
];

const startDataDark = [
    {
        duration: '1 night',
        value: 0,
        color: '#b91c1c',
    },
    {
        duration: '2 nights',
        value: 0,
        color: '#c2410c',
    },
    {
        duration: '3 nights',
        value: 0,
        color: '#a16207',
    },
    {
        duration: '4-5 nights',
        value: 0,
        color: '#4d7c0f',
    },
    {
        duration: '6-7 nights',
        value: 0,
        color: '#15803d',
    },
    {
        duration: '8-14 nights',
        value: 0,
        color: '#0f766e',
    },
    {
        duration: '15-21 nights',
        value: 0,
        color: '#1d4ed8',
    },
    {
        duration: '21+ nights',
        value: 0,
        color: '#7e22ce',
    },
];

// --- helper functions --- //
// функция подготовки данных
function prepareData(startData, stays) {
    // функция для увеличения значения в массиве
    function incArrayValue(arr, field) {
        return arr.map((obj) =>
            obj.duration === field ? { ...obj, value: obj.value + 1 } : obj
        );
    }

    // формируем данные
    // немного некрасивый код, но иногда можно при работе с реальными данными 😎
    const data = stays
        .reduce((arr, cur) => {
            const num = cur.numNights;
            if (num === 1) return incArrayValue(arr, '1 night');
            if (num === 2) return incArrayValue(arr, '2 nights');
            if (num === 3) return incArrayValue(arr, '3 nights');
            if ([4, 5].includes(num)) return incArrayValue(arr, '4-5 nights');
            if ([6, 7].includes(num)) return incArrayValue(arr, '6-7 nights');
            if (num >= 8 && num <= 14) return incArrayValue(arr, '8-14 nights');
            if (num >= 15 && num <= 21)
                return incArrayValue(arr, '15-21 nights');
            if (num >= 21) return incArrayValue(arr, '21+ nights');
            return arr;
        }, startData)
        .filter((obj) => obj.value > 0);

    return data;
}

// --- component --- //
function DurationChart({ confirmedStays }) {
    // получаем состояние темы из контекста с помощью кастомного хука
    const { isDarkMode } = useDarkMode();

    // формируем начальные данные в зависимости от темы (темная/светлая)
    const startData = isDarkMode ? startDataDark : startDataLight;
    // формируем данные для графика с помощью вспомогательной функции prepareData
    const durationData = prepareData(startData, confirmedStays);

    return (
        <ChartBox>
            <Heading as="h2">Stay duration summary</Heading>

            <ResponsiveContainer width="100%" height={240}>
                <PieChart>
                    <Pie
                        data={durationData}
                        nameKey="duration" // ключ имени
                        dataKey="value" // ключ данных
                        innerRadius={85} // внутренний радиус
                        outerRadius={110} // внешний радиус
                        cx="40%" // центр по горизонтали
                        cy="50%" // центр по вертикали
                        paddingAngle={3} // отступ между секторами
                    >
                        {durationData.map((item, i) => (
                            <Cell
                                key={item.duration + i}
                                fill={item.color}
                                stroke={item.color}
                            />
                        ))}
                    </Pie>

                    {/* всплывающая подсказка при наведении */}
                    <Tooltip
                        contentStyle={{
                            backgroundColor: isDarkMode ? '#1d3c72' : '#fff', // цвет фона подсказки
                        }}
                    />

                    {/* информация о каждом значении */}
                    <Legend
                        // настраиваем компонент
                        verticalAlign="middle"
                        align="right"
                        width="30%"
                        layout="vertical"
                        iconSize={15}
                        iconType="circle"
                    />
                </PieChart>
            </ResponsiveContainer>
        </ChartBox>
    );
}

export default DurationChart;

// --- props-types --- //
DurationChart.propTypes = {
    confirmedStays: PropTypes.array.isRequired,
};
