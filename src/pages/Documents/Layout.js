import { useConvexAuth } from 'convex/react';
import { Spinner } from '~/components/Spinner';
import Navigation from './components/Navigation';
import { SearchCommand } from '~/components/SearchCommand';
import ModalProvider from '~/providers/ModalProvider';

function Layout({ children }) {
    const { isAuthenticated, isLoading } = useConvexAuth();

    if (isLoading)
        return (
            <div className="h-screen w-full flex items-center justify-center">
                <Spinner size="lg" />
            </div>
        );

    if (!isAuthenticated) return (window.location = '/');

    return (
        <div className="h-screen w-full flex dark:bg-[#1F1F1F]">
            <Navigation />
            <main className="flex-1 h-full overflow-y-auto">
                <SearchCommand />
                <ModalProvider />
                {children}
            </main>
        </div>
    );
}

export default Layout;
