import { useState } from 'react';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '~/components/AlertDialog';

function ConfirmModal({ children, onConfirm }) {
    const [isOpen, setIsOpen] = useState(false);

    const handleConfirm = (e) => {
        e.stopPropagation();
        onConfirm();
    };

    const onToggleAlert = () => {
        setIsOpen(!isOpen);
    };
    return (
        <AlertDialog isOpen={isOpen} onToggleAlert={onToggleAlert}>
            <AlertDialogTrigger>{children}</AlertDialogTrigger>
            {isOpen && (
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={() => setIsOpen(false)}>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleConfirm}>Confirm</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            )}
        </AlertDialog>
    );
}

export default ConfirmModal;
