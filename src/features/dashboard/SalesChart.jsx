import styled from 'styled-components';
import {
    AreaChart,
    Area,
    CartesianGrid,
    Tooltip,
    XAxis,
    YAxis,
    ResponsiveContainer,
} from 'recharts';
import { eachDayOfInterval, format, isSameDay, subDays } from 'date-fns';
import PropTypes from 'prop-types';

import DashboardBox from './DashboardBox';
import Heading from '../../ui/Heading';

import { useDarkMode } from '../../hooks/useDarkMode';

// --- styled components --- //
const StyledSalesChart = styled(DashboardBox)`
    grid-column: 1 / -1; // от первой колонки до последней на всю ширину

    /* "Хак" для изменения цвета линий сетки */
    & .recharts-cartesian-grid-horizontal line,
    & .recharts-cartesian-grid-vertical line {
        stroke: var(--color-grey-300);
    }
`;

// --- component --- //
function SalesChart({ bookings, numDays }) {
    // получаем состояние темы из контекста с помощью кастомного хука
    const { isDarkMode } = useDarkMode();

    // объект с цветами в зависимости от темы (темная/светлая)
    const colors = isDarkMode
        ? {
              totalSales: { stroke: '#4f46e5', fill: '#4f46e5' },
              extrasSales: { stroke: '#22c55e', fill: '#22c55e' },
              text: '#e5e7eb',
              background: '#18212f',
          }
        : {
              totalSales: { stroke: '#4f46e5', fill: '#c7d2fe' },
              extrasSales: { stroke: '#16a34a', fill: '#dcfce7' },
              text: '#374151',
              background: '#fff',
          };

    // // --- пример массива данных для формирования графика --- //
    // const fakeData = [
    //     { label: 'Jan 09', totalSales: 480, extrasSales: 20 },
    //     { label: 'Jan 10', totalSales: 580, extrasSales: 100 },
    //     { label: 'Jan 11', totalSales: 550, extrasSales: 150 },
    // ];

    // формируем объект всех дат с помощью библиотеки date-fns:(echDayOfInterval, isSameDay, subDays) !!!
    const allDates = eachDayOfInterval({
        // дата начала
        start: subDays(new Date(), numDays - 1), // сегодняшний день - количество дней которое нужно отнять (7 дней, 30 или 90) и - 1

        // дата конца
        end: new Date(), // сегодняшний день
    });

    // теперь формируем массив данных для графика (по примеру fakeData) с помощью объекта allDates и библиотеки date-fns:(format, isSameDay) !!!
    const data = allDates.map((date) => {
        return {
            label: format(date, 'MMM dd'), // форматирование даты
            totalSales: bookings
                .filter(
                    (booking) => isSameDay(date, new Date(booking.created_at)) // сравниваем все даты с текущей датой в этом цикле и получаем все заказы с сегодняшней даты
                )
                .reduce((acc, cur) => acc + cur.totalPrice, 0), // суммируем все цены
            extrasSales: bookings
                .filter(
                    (booking) => isSameDay(date, new Date(booking.created_at)) // сравниваем все даты с текущей датой в этом цикле и получаем все заказы с сегодняшней даты
                )
                .reduce((acc, cur) => acc + cur.extrasPrice, 0), // суммируем все цены
        };
    });

    return (
        <StyledSalesChart>
            <Heading as="h2">Sales</Heading>

            {/* адаптивный контейнер  */}
            <ResponsiveContainer height={300} width="100%">
                <AreaChart data={data}>
                    {/* ось X */}
                    <XAxis
                        dataKey="label" // ключ - какие данные будут отображаться на оси X
                        // стилизация оси X
                        tick={{ fill: colors.text }}
                        tickLine={{ stroke: colors.text }}
                    />
                    {/* ось Y */}
                    <YAxis
                        unit="$"
                        // стилизация оси Y
                        tick={{ fill: colors.text }}
                        tickLine={{ stroke: colors.text }}
                    />

                    {/* сетка */}
                    <CartesianGrid strokeDasharray="4" />

                    {/* всплывающая подсказка */}
                    <Tooltip
                        contentStyle={{
                            backgroundColor: colors.background, // цвет фона подсказки
                        }}
                    />

                    {/* график общих продаж */}
                    <Area
                        dataKey="totalSales" // ключ - какие данные будут отображаться
                        type="monotone" // тип графика
                        stroke={colors.totalSales.stroke} // цвет обводки
                        fill={colors.totalSales.fill} // цвет заливки
                        strokeWidth={2} // толщина линии
                        name="Total sales" // текст во всплывающей подсказке
                        unit="$" // единица измерения
                    />

                    {/* график дополнительных продаж (завтрак) */}
                    <Area
                        dataKey="extrasSales" // ключ - какие данные будут отображаться
                        type="monotone"
                        stroke={colors.extrasSales.stroke} // цвет обводки
                        fill={colors.extrasSales.fill} // цвет заливки
                        strokeWidth={2} // толщина линии
                        name="Extras sales" // текст во всплывающей подсказке
                        unit="$" // единица измерения
                    />
                </AreaChart>
            </ResponsiveContainer>
        </StyledSalesChart>
    );
}

export default SalesChart;

// --- props-types --- //
SalesChart.propTypes = {
    bookings: PropTypes.array.isRequired,
    numDays: PropTypes.number.isRequired,
};
