import { useContext } from 'react';

import { DarkModeContext } from '../context/DarkModeContext';

// создаем хук для сохранения состояния темы в контексте
function useDarkMode() {
    const contex = useContext(DarkModeContext);

    if (contex === undefined) {
        throw new Error('useDarkMode was used outside of DarkModeProvider');
    }

    return contex;
}

export { useDarkMode };
