import React from 'react';

function Command({ children, className }) {
    return <div className={`p-1 bg-background text-muted-foreground rounded-md ${className}`}>{children}</div>;
}

export default Command;
