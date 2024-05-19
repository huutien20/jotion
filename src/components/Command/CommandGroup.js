import React, { Children } from 'react';
import CommandItem from './CommandItem';
import CommandEmpty from './CommandEmpty';

const CommandGroup = ({ children, heading }) => {
    const childArray = Children.toArray(children);
    const commandItem = childArray.filter((child) => child.type === CommandItem);
    const commandEmpty = childArray.find((child) => child.type === CommandEmpty);

    return (
        <div className="flex flex-col gap-1">
            {commandItem && <h4 className="pt-1 ml-2 text-sm text-muted-foreground border-t">{heading}</h4>}
            {commandItem || commandEmpty}
        </div>
    );
};

export default CommandGroup;
