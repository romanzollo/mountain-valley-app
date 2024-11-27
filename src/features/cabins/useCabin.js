import { useQuery } from '@tanstack/react-query';

import { getCabins } from '../../services/apiCabins';

// кастомный хук для получения данных из API
// для дальейшего удобного использования в компонентах
export function useCabin() {
    const {
        isLoading,
        data: cabins,
        error,
    } = useQuery({
        queryKey: ['cabins'], // ключ запроса
        queryFn: getCabins, // функция запроса(обязательно должна возвращать Promise)
    });

    return { cabins, isLoading, error };
}
