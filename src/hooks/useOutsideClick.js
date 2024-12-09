import { useEffect, useRef } from 'react';

// custom hook который следит за кликами вне компонента
export function useOutsideClick(handler, listenCupturing = true) {
    const ref = useRef();

    useEffect(() => {
        function handleClick(e) {
            if (ref.current && !ref.current.contains(e.target)) handler();
        }

        // третий аргумент - true - обработчик срабатывает только на этапе погружения
        document.addEventListener('click', handleClick, listenCupturing);

        // удаляем слушатель события при размонтировании компонента
        // третий аргумент - true - обработчик срабатывает только на этапе погружения
        return () =>
            document.removeEventListener('click', handleClick, listenCupturing);
    }, [handler, listenCupturing]);

    // возвращаем ref чтобы его можно было использовать внутри компонента
    return ref;
}
