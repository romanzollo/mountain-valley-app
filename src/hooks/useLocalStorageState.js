import { useState, useEffect } from 'react';

// cоздаем хук для работы с локальным хранилищем
export function useLocalStorageState(initialState, key) {
    const [value, setValue] = useState(function () {
        const storedValue = localStorage.getItem(key);
        return storedValue ? JSON.parse(storedValue) : initialState;
    });

    // сохраняем состояние в локальное хранилище при первом рендере и при дальнейшем изменении состояния
    useEffect(
        function () {
            localStorage.setItem(key, JSON.stringify(value));
        },
        [value, key]
    );

    return [value, setValue];
}
