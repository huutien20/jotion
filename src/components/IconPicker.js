import EmojiPicker, { Theme } from 'emoji-picker-react';
import React from 'react';
import useTheme from '~/hooks/useTheme';
import { Popover, PopoverContent, PopoverTrigger } from './Popover';

function IconPicker({ onChange, children, asChild }) {
    const { theme } = useTheme();
    const currentTheme = theme || 'light';
    const themeMap = {
        dark: Theme.DARK,
        light: Theme.LIGHT,
    };

    const themeEmoji = themeMap[currentTheme];

    return (
        <Popover>
            <PopoverTrigger>{children}</PopoverTrigger>

            <PopoverContent className={'p-0 w-full border-none shadow-none'}>
                <EmojiPicker height={350} theme={themeEmoji} onEmojiClick={(data) => onChange(data.emoji)} />
            </PopoverContent>
        </Popover>
    );
}

export default IconPicker;
