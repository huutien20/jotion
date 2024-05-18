import React from 'react';

function CommandEmpty({ children, className }) {
    return <div className={`text-center text-sm text-muted-foreground border-t py-1 ${className}`}>{children}</div>;
}

export default CommandEmpty;
