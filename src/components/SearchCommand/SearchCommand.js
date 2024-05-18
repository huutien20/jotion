import { useQuery } from 'convex/react';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '~/convex/_generated/api';
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '../Command';
import { useSearch } from '~/hooks/useSearch';
import { File } from 'lucide-react';

function SearchCommand() {
    const navigate = useNavigate();
    const documents = useQuery(api.documents.getSearch);
    const [isMounted, setIsMounted] = useState(false);
    const [searchValue, setSearchValue] = useState('');

    const toggle = useSearch((store) => store.toggle);
    const isOpen = useSearch((store) => store.isOpen);
    const onClose = useSearch((store) => store.onClose);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        const down = (e) => {
            if (e.key === 'k' && e.altKey) {
                e.preventDefault();
                toggle();
            }
        };
        document.addEventListener('keydown', down);

        return () => document.removeEventListener('keydown', down);
    }, [toggle]);

    const onSelect = (documentId) => {
        navigate(`/documents/${documentId}`);
        onClose();
    };

    if (!isMounted) {
        return null;
    }

    return (
        <CommandDialog open={isOpen} onOpenChange={onClose}>
            <CommandInput
                placeholder="Search document..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
            />
            <CommandList>
                <CommandGroup heading="Documents">
                    <CommandEmpty>No results found.</CommandEmpty>
                    {documents?.map((document) => (
                        <CommandItem
                            key={document._id}
                            // value={`${document._id}-${document.title}`}
                            // title={document.title}
                            onSelect={() => onSelect(document._id)}
                        >
                            {document.icon ? (
                                <p className="mr-2 text-[18px]">{document.icon}</p>
                            ) : (
                                <File className="mr-2 h-4 w-4" />
                            )}
                            <span>{document.title}</span>
                        </CommandItem>
                    ))}
                </CommandGroup>
            </CommandList>
        </CommandDialog>
    );
}

export default SearchCommand;
