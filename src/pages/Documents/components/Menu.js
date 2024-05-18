import { useUser } from '@clerk/clerk-react';
import { useMutation } from 'convex/react';
import { MoreHorizontal, Trash2 } from 'lucide-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Button } from '~/components/Button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '~/components/DropdownMenu';
import { api } from '~/convex/_generated/api';

function Menu({ documentId }) {
    const navigate = useNavigate();

    const { user } = useUser();

    const archive = useMutation(api.documents.archive);

    const onArchive = () => {
        const promise = archive({ id: documentId });

        toast.promise(promise, {
            loading: 'Moving to trash...',
            success: 'Note moved to trash!',
            error: 'Failed to archive note.',
        });

        navigate('/documents');
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Button size="sm" variant={'ghost'}>
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent side="left" className={'w-60'}>
                <DropdownMenuItem onClick={onArchive}>
                    <div className="p-1 flex items-center gap-x-2">
                        <Trash2 size={16} />
                        <span>Delete</span>
                    </div>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <div className="text-xs text-muted-foreground p-2">Last edited by: {user?.fullName}</div>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export default Menu;
