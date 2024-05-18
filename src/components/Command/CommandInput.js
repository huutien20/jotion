import React from 'react';

const CommandInput = ({ placeholder = '', onChange, value }) => {
    return (
        <input
            type="text"
            placeholder={placeholder}
            className="w-full bg-transparent text-muted-foreground border-none outline-none p-2 rounded"
            onChange={onChange}
            value={value}
        />
    );
};

export default CommandInput;
