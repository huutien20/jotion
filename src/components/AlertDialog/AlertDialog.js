import { Children } from 'react';
import AlertDialogTrigger from './AlertDialogTrigger';
import AlertDialogContent from './AlertDialogContent';
import { createPortal } from 'react-dom';

function AlertDialog({ children, isOpen, onToggleAlert }) {
    const childArray = Children.toArray(children);
    const triggerComponent = childArray.find((child) => child.type === AlertDialogTrigger);
    const contentComponent = childArray.find((child) => child.type === AlertDialogContent);

    const portalRoot = document.getElementById('alert-root');

    return (
        <div>
            <div onClick={onToggleAlert}>{triggerComponent}</div>
            {isOpen &&
                createPortal(
                    <div className="fixed top-0 left-0 w-screen h-screen bg-black/20 dark:bg-white/20 backdrop-filter backdrop-blur-sm z-[99999]">
                        <div className="flex h-full w-full items-center justify-center">{contentComponent}</div>
                    </div>,
                    portalRoot,
                )}
        </div>
    );
}

export default AlertDialog;
