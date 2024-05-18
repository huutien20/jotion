import { Laptop, Moon, Sun } from 'lucide-react';
import React, { useState } from 'react';
import useTheme from '~/hooks/useTheme';
import Item from './Item';

function ThemeSwitcherButton() {
    const { theme, setTheme } = useTheme();

    const [isOpen, setIsOpen] = useState(false);
    const [themeSelected, setThemeSelected] = useState(theme);

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    const handleChooseTheme = (newTheme) => {
        setThemeSelected(newTheme);
        setTheme(newTheme);
    };

    const container = [
        {
            label: 'Light',
            icon: Sun,
        },
        {
            label: 'Dark',
            icon: Moon,
        },
        {
            label: 'System',
            icon: Laptop,
        },
    ];
    return (
        <button
            className="relative w-10 h-10 flex items-center justify-center rounded-sm bg-background border"
            onClick={handleToggle}
        >
            {themeSelected === 'Dark' ? (
                <Moon size={20} />
            ) : themeSelected === 'Light' ? (
                <Sun size={20} />
            ) : (
                <Laptop size={20} />
            )}
            {isOpen && (
                <ul className="absolute top-11 right-0 w-32 p-1 bg-background rounded-md border shadow-sm">
                    {container.map((item) => (
                        <Item key={item.label} label={item.label} icon={item.icon} onClick={handleChooseTheme} />
                    ))}
                </ul>
            )}
        </button>
    );
}

export default ThemeSwitcherButton;
