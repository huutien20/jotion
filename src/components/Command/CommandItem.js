import React from 'react';

const CommandItem = ({ children, onSelect }) => {
    return (
        <div onClick={onSelect} className="flex items-center cursor-pointer hover:bg-primary/5 rounded-sm py-1 px-2">
            {children}
        </div>
    );
};

export default CommandItem;
