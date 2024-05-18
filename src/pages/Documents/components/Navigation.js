import React, { useEffect, useRef, useState } from 'react';
import { useMediaQuery } from 'usehooks-ts';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation } from 'convex/react';
import { toast } from 'sonner';
import { ChevronsLeft, MenuIcon, Plus, PlusCircle, Search, Settings, Trash2 } from 'lucide-react';

import { api } from '~/convex/_generated/api';
import { Popover, PopoverContent, PopoverTrigger } from '~/components/Popover';
import { useSearch } from '~/hooks/useSearch';
import { useSettings } from '~/hooks/useSettings';

import UserItem from './UserItem';
import Item from './Item';
import TrashBox from './TrashBox';
import DocumentList from './DocumentList';
import Navbar from './Navbar';

function Navigation() {
    const isMobile = useMediaQuery('(max-width: 768px)');
    const params = useParams();
    const search = useSearch();
    const settings = useSettings();

    const isResizingRef = useRef(false);
    const sidebarRef = useRef(false);
    const navbarRef = useRef(false);
    const navigate = useNavigate();

    const [isResetting, setIsResetting] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(false);

    const createDocument = useMutation(api.documents.create);

    useEffect(() => {
        if (isMobile) {
            collapse();
        } else {
            resetWidth();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isMobile]);

    const handleMouseDown = (e) => {
        e.preventDefault();
        e.stopPropagation();

        isResizingRef.current = true;

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    };

    const handleMouseMove = (e) => {
        if (!isResizingRef.current) return;
        let newWidth = e.clientX;
        if (newWidth < 240) newWidth = 240;
        if (newWidth > 480) newWidth = 480;

        if (sidebarRef.current && navbarRef.current) {
            sidebarRef.current.style.setProperty('width', `${newWidth}px`);
            navbarRef.current.style.setProperty('left', `${newWidth}px`);
            navbarRef.current.style.setProperty('width', `calc(100% - ${newWidth}px)`);
        }
    };

    const handleMouseUp = () => {
        isResizingRef.current = false;
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
    };

    const resetWidth = () => {
        if (sidebarRef.current && navbarRef.current) {
            setIsCollapsed(false);
            setIsResetting(true);

            sidebarRef.current.style.width = isMobile ? '100%' : '240px';
            navbarRef.current.style.width = isMobile ? '0' : 'calc(100% - 240px)';
            navbarRef.current.style.left = isMobile ? '100%' : '240px';

            setTimeout(() => setIsResetting(false), 300);
        }
    };

    const collapse = () => {
        if (sidebarRef.current && navbarRef.current) {
            setIsCollapsed(true);
            setIsResetting(true);

            sidebarRef.current.style.width = '0';
            navbarRef.current.style.width = '100%';
            navbarRef.current.style.left = '0';
            setTimeout(() => setIsResetting(false), 300);
        }
    };

    const handleCreate = () => {
        const promise = createDocument({ title: 'Untitled' }).then((documentId) =>
            navigate(`/documents/${documentId}`),
        );

        toast.promise(promise, {
            loading: 'Creating a new note...',
            success: 'New note created!',
            error: 'Failed to create a new note.',
        });
    };

    return (
        <>
            <aside
                ref={sidebarRef}
                className={`group/sidebar relative h-full w-60 flex flex-col bg-secondary overflow-y-auto z-[99999] ${
                    isResetting && 'transition-all ease-in-out duration-300'
                }`}
            >
                <button
                    className={`opacity-0 group-hover/sidebar:opacity-100 absolute top-3 right-2 h-6 w-6 flex items-center justify-center text-muted-foreground rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600 transition z-[9999] ${
                        isMobile && 'opacity-100'
                    }`}
                    onClick={collapse}
                >
                    <ChevronsLeft size={18} />
                </button>
                <div>
                    <UserItem />
                    <Item label="Search" icon={Search} onClick={search.onOpen} />
                    <Item label="Setting" icon={Settings} onClick={settings.onOpen} />
                    <Item label="New page" icon={PlusCircle} onClick={handleCreate} />
                </div>
                <div className="mt-4">
                    <DocumentList />

                    <Item label="Add a page" icon={Plus} onClick={handleCreate} />

                    <Popover>
                        <PopoverTrigger className="mt-4" onClick={() => {}}>
                            <Item label="Trash" icon={Trash2} />
                        </PopoverTrigger>
                        <PopoverContent className="p-0 w-72">
                            <TrashBox />
                        </PopoverContent>
                    </Popover>
                </div>
                <div
                    onMouseDown={handleMouseDown}
                    onClick={resetWidth}
                    className={`opacity-0 group-hover/sidebar:opacity-100 absolute h-full w-1 right-0 top-0 bg-primary/10 transition cursor-ew-resize`}
                ></div>
            </aside>
            <div
                ref={navbarRef}
                className={`absolute top-0 left-60 w-[calc(100%-240px)] z-[99999] overflow-hidden ${
                    isResetting && 'transition-all ease-in-out duration-300'
                }`}
            >
                {!!params.documentId ? (
                    <Navbar isCollapsed={isCollapsed} onResetWidth={resetWidth} />
                ) : (
                    <nav className="bg-transparent px-3 py-2 w-full">
                        {isCollapsed && (
                            <button
                                onClick={resetWidth}
                                className="h-6 w-6 flex items-center justify-center text-muted-foreground rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600"
                            >
                                <MenuIcon size={18} />
                            </button>
                        )}
                    </nav>
                )}
            </div>
        </>
    );
}

export default Navigation;
