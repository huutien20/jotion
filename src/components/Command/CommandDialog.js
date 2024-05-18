import { X } from 'lucide-react';
import React from 'react';

function CommandDialog({ children, className, open, onOpenChange }) {
    return (
        <div
            className={`fixed top-0 left-0 flex items-center justify-center w-full h-full bg-black/20 dark:bg-white/20 backdrop-blur-sm backdrop-filter z-[99999] ${
                open ? 'block' : 'hidden'
            }`}
        >
            <div
                className={` relative min-w-[350px] p-1 bg-background text-muted-foreground rounded-md border border-muted ${className}`}
            >
                <div
                    onClick={onOpenChange}
                    role="button"
                    className="absolute top-3 right-3 rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600"
                >
                    <X className="h-4 w-4 rounded-sm text-muted-foreground" />
                </div>
                {children}
            </div>
        </div>
    );
}

export default CommandDialog;
