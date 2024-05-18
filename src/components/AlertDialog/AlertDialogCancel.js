import React from 'react';
import { Button } from '../Button';

function AlertDialogCancel({ children, onClick: handleClick }) {
    return (
        <Button variant={'outline'} onClick={handleClick}>
            {children}
        </Button>
    );
}

export default AlertDialogCancel;
