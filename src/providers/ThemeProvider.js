import { createContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

function ThemeProvider({ defaultTheme = 'System', children }) {
    const [theme, setTheme] = useState(defaultTheme);

    useEffect(() => {
        const savedTheme = localStorage.getItem('jotion-theme');

        if (savedTheme) {
            setTheme(savedTheme);
        } else {
            setTheme(defaultTheme);
        }
    }, [defaultTheme]);

    useEffect(() => {
        localStorage.setItem('jotion-theme', theme);
    }, [theme]);

    useEffect(() => {
        var tmpTheme = theme;

        if (tmpTheme === 'System') {
            tmpTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'Dark' : 'Light';
            setTheme(tmpTheme);
        }
        const rootElement = document.documentElement;
        rootElement.classList.toggle('dark', tmpTheme === 'Dark');
        rootElement.classList.toggle('light', tmpTheme === 'Light');
    }, [theme]);

    return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
}

export { ThemeProvider, ThemeContext };
