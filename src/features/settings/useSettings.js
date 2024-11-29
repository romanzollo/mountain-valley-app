import { useQuery } from '@tanstack/react-query';
import { getSettings } from '../../services/apiSettings';

// кастомный хук для получения данных о настройках из API
export function useSettings() {
    const {
        isLoading,
        data: settings,
        error,
    } = useQuery({
        queryKey: ['settings'], // ключ запроса который нужно обновить
        queryFn: getSettings, // функция запроса(обязательно должна возвращать Promise)
    });

    return { settings, isLoading, error };
}
