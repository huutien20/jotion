import React from 'react';

function AlertDialogContent({ children }) {
    return (
        <div className="p-6 bg-background rounded-md shadow-lg min-w-80 border border-border-muted z-[99999]">
            {children}
        </div>
    );
}

export default AlertDialogContent;
