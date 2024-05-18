import { useUser } from '@clerk/clerk-react';
import { useMutation } from 'convex/react';
import { ChevronDown, ChevronRight, Ellipsis, Plus, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useMediaQuery } from 'usehooks-ts';
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
} from '~/components/DropdownMenu';
import { api } from '~/convex/_generated/api';

function Item({ id, documentIcon, active, expanded, level = 0, onExpand, label, icon: Icon, onClick: handleClick }) {
    const isMobile = useMediaQuery('(max-width: 768px)');

    const { user } = useUser();

    const create = useMutation(api.documents.create);
    const archive = useMutation(api.documents.archive);

    const navigate = useNavigate();

    const handleExpand = (e) => {
        e.stopPropagation();
        onExpand?.();
    };

    const onCreate = (e) => {
        e.stopPropagation();
        if (!id) return;
        const promise = create({ title: 'Untitled', parentDocument: id }).then((documentId) => {
            if (!expanded) onExpand?.();
            navigate(`/documents/${documentId}`);
        });

        toast.promise(promise, {
            loading: 'Creating a new note...',
            success: 'New note created!',
            error: 'Failed to create a new note.',
        });
    };

    const onArchive = (e) => {
        if (!id) return;
        const promise = archive({ id }).then(() => navigate('/documents'));

        toast.promise(promise, {
            loading: 'Moving to trash...',
            success: 'Note moved to trash!',
            error: 'Failed to archive note.',
        });
    };

    const ChevronIcon = expanded ? ChevronDown : ChevronRight;

    return (
        <div
            role="button"
            onClick={handleClick}
            style={{ paddingLeft: level ? `${level * 12 + 12}px` : '12px' }}
            className={`group min-h-[27px] py-1 pr-3 w-full flex items-center text-sm text-muted-foreground font-medium hover:bg-primary/5 ${
                active && 'bg-primary/5 text-primary'
            }`}
        >
            {!!id && (
                <button
                    className="h-full rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600 mr-1"
                    onClick={handleExpand}
                >
                    <ChevronIcon className="h-4 w-4 shrink-0 text-muted-foreground/50" />
                </button>
            )}
            {documentIcon ? (
                <div className="shrink-0 mr-2 text-[18px]">{documentIcon}</div>
            ) : (
                <Icon className="shrink-0 h-[18px] w-[18px] mr-2 text-muted-foreground" />
            )}
            <span className="truncate">{label}</span>

            {!!id && (
                <div className="ml-auto flex items-center gap-x-2">
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <div
                                role="button"
                                className={`opacity-0 h-full group-hover:opacity-100 hover:bg-neutral-300 dark:hover:bg-neutral-600 rounded-sm ${
                                    isMobile && 'opacity-100'
                                }`}
                            >
                                <Ellipsis className="w-4 h-4 text-muted-foreground" />
                            </div>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent side={`${isMobile ? 'left' : 'right'}`} className={'w-60'}>
                            <DropdownMenuItem onClick={onArchive}>
                                <div className="p-1 flex items-center gap-x-2">
                                    <Trash2 size={16} />
                                    <span>Delete</span>
                                </div>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <div className="py-2 text-sm text-muted-foreground">Last edited by: {user?.fullName}</div>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    <div
                        onClick={(e) => onCreate(e)}
                        className={`opacity-0 group-hover:opacity-100 h-full ml-auto rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600 ${
                            isMobile && 'opacity-100'
                        }`}
                    >
                        <Plus className="h-4 w-4 text-muted-foreground" />
                    </div>
                </div>
            )}
        </div>
    );
}

export default Item;
