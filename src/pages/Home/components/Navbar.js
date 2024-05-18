import useScrollTop from '~/hooks/useScrollTop';
import Logo from './Logo';
import { ThemeSwitcherButton } from '~/components/ThemeSwitcherButton';
import { useConvexAuth } from 'convex/react';
import { UserButton } from '@clerk/clerk-react';
import { Button } from '~/components/Button';
import { Link } from 'react-router-dom';
import { Spinner } from '~/components/Spinner';

function Navbar() {
    const { isLoading, isAuthenticated } = useConvexAuth();
    const scrolled = useScrollTop();

    return (
        <div
            className={`z-50 fixed top-0 flex items-center w-full p-6 bg-background dark:bg-[#1f1f1f] ${
                scrolled && 'border-b shadow-sm'
            }`}
        >
            <Logo />

            <div className="md:ml-auto w-full flex items-center justify-between md:justify-end gap-x-2">
                {isLoading && <Spinner size="sm" />}
                {!isLoading && !isAuthenticated && (
                    <>
                        <Button type="sign-in" variant="ghost" size="sm">
                            Sign in
                        </Button>
                        <Button type="sign-in" variant="primary" size="sm">
                            Get Jotion Free
                        </Button>
                    </>
                )}
                {!isLoading && isAuthenticated && (
                    <>
                        <Button variant="ghost" size="sm">
                            <Link to="/documents">Enter Jotion</Link>
                        </Button>
                        <UserButton afterSignOutUrl="/" />
                    </>
                )}
                <ThemeSwitcherButton />
            </div>
        </div>
    );
}

export default Navbar;
