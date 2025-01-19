import { useQuery } from '@tanstack/react-query';

import { getStaysTodayActivity } from '../../services/apiBookings';

export function useTodayActivity() {
    // кастомный хук для получения данных из API
    // для дальейшего удобного использования в компонентах
    const { data: activities, isLoading } = useQuery({
        queryFn: getStaysTodayActivity, // функция запроса
        queryKey: ['today-activity'], // ключ запроса
    });

    return { activities, isLoading };
}
