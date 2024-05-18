import { SignInButton } from '@clerk/clerk-react';
import { useConvexAuth } from 'convex/react';
import { ArrowRight } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '~/components/Button';
import { Spinner } from '~/components/Spinner';

function Heading() {
    const { isLoading, isAuthenticated } = useConvexAuth();
    return (
        <div className="flex flex-col items-center justify-center max-w-3xl space-y-4 dark:bg-[#1f1f1f]">
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold">
                Your Ideas, Documents & Plans. Welcome to <span className="underline cursor-pointer">Jotion</span>
            </h1>

            <h3 className="text-base sm:text-xl md:text-2xl font-medium">
                Jotion is the connected workspace where <br />
                better, faster work happens.
            </h3>

            {!isLoading && !isAuthenticated && (
                <Button variant={'primary'} size="md">
                    <SignInButton mode="modal">Enter Jotion Free</SignInButton>
                    <ArrowRight size={16} />
                </Button>
            )}

            {isLoading && <Spinner size="lg" />}
            {!isLoading && isAuthenticated && (
                <Button variant="primary" size="md">
                    <Link to="documents">Enter Jotion</Link>
                    <ArrowRight size={16} />
                </Button>
            )}
        </div>
    );
}

export default Heading;
