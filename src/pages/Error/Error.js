import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '~/components/Button';

function Error() {
    return (
        <div className="h-screen w-screen flex flex-col items-center justify-center space-y-4">
            <h2 className="text-xl font-medium">Something went wrong!</h2>
            <Button variant={'primary'}>
                <Link to="/documents">Go back</Link>
            </Button>
        </div>
    );
}

export default Error;
