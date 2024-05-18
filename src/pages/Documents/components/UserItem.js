import { SignOutButton, useUser } from '@clerk/clerk-react';
import { ChevronsLeftRight } from 'lucide-react';

import { Avatar } from '~/components/Avatar';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '~/components/DropdownMenu';

function UserItem() {
    const user = useUser().user;

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <button className="flex items-center text-sm p-3 w-full hover:bg-primary/5">
                        <div className="flex items-center gap-x-2 max-w-[150px]">
                            <Avatar src={user?.imageUrl} alt="Avatar" />
                            <span className="text-start font-medium line-clamp-1">
                                {user?.fullName ? user?.fullName : user?.username}
                            </span>
                        </div>

                        <ChevronsLeftRight size={16} className="rotate-90 ml-2 text-muted-foreground" />
                    </button>
                </DropdownMenuTrigger>

                <DropdownMenuContent className={'w-60'}>
                    <div className="flex flex-col w-full p-2 space-y-4">
                        <p className="text-xs font-medium leading-none text-muted-foreground">
                            {user?.emailAddresses[0].emailAddress}
                        </p>

                        <div className="flex items-center gap-x-2 w-full">
                            <Avatar src={user?.imageUrl} alt="Avatar" />
                            <div className="space-y-1">
                                <p className="text-sm line-clamp-1">{user?.fullName}</p>
                            </div>
                        </div>
                    </div>

                    <DropdownMenuSeparator />

                    <DropdownMenuItem className="w-full border-none rounded-sm h-7 px-2 flex items-center space-x-1 cursor-pointer text-muted-foreground hover:bg-neutral-300 dark:hover:bg-neutral-600">
                        <SignOutButton className="w-full text-sm text-left font-semibold">Log out</SignOutButton>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    );
}

export default UserItem;
