import React from 'react';
import { Button } from '../Button';

function AlertDialogAction({ children, onClick: handleClick }) {
    return (
        <Button variant={'primary'} onClick={handleClick}>
            {children}
        </Button>
    );
}

export default AlertDialogAction;
