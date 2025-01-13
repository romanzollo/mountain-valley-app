import { createContext, useEffect } from 'react';
import { useLocalStorageState } from '../hooks/useLocalStorageState';
import PropTypes from 'prop-types';

// создаем и экспортируем контекст
export const DarkModeContext = createContext();

// context provider
function DarkModeProvider({ children }) {
    const [isDarkMode, setIsDarkMode] = useLocalStorageState(
        false,
        'isDarkMode'
    );

    // устанавливаем класс для темы в зависимости от значения isDarkMode
    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark-mode');
            document.documentElement.classList.remove('light-mode');
        } else {
            document.documentElement.classList.add('light-mode');
            document.documentElement.classList.remove('dark-mode');
        }
    }, [isDarkMode]);

    // функция для переключения темы
    function toggleDarkMode() {
        setIsDarkMode((isDark) => !isDark);
    }

    return (
        <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
            {children}
        </DarkModeContext.Provider>
    );
}

export { DarkModeProvider };

// --- prop-types --- //
DarkModeProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
