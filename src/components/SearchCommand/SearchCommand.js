import { useQuery } from 'convex/react';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '~/convex/_generated/api';
import { CommandDialog, CommandInput, CommandItem, CommandList } from '../Command';
import { useSearch } from '~/hooks/useSearch';
import { File, Search } from 'lucide-react';

function SearchCommand() {
    const navigate = useNavigate();
    const documents = useQuery(api.documents.getSearch);
    const [isMounted, setIsMounted] = useState(false);
    const [searchValue, setSearchValue] = useState('');

    const toggle = useSearch((store) => store.toggle);
    const isOpen = useSearch((store) => store.isOpen);
    const onClose = useSearch((store) => store.onClose);

    const filteredDocuments = documents?.filter((document) =>
        document.title.toLowerCase().includes(searchValue.toLowerCase()),
    );

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
            <div className="flex items-center gap-x-1 px-2 border-b">
                <Search size={16} className="cursor-pointer" />

                <CommandInput
                    placeholder="Search document by page title..."
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                />
            </div>

            <CommandList>
                {filteredDocuments.length > 0 ? (
                    filteredDocuments.map((document) => (
                        <CommandItem key={document._id} onSelect={() => onSelect(document._id)}>
                            {document.icon ? (
                                <p className="mr-2 text-[18px]">{document.icon}</p>
                            ) : (
                                <File className="mr-2 h-4 w-4" />
                            )}
                            <span>{document.title}</span>
                        </CommandItem>
                    ))
                ) : (
                    <div className="text-center text-sm text-muted-foreground border-t py-1">No results found.</div>
                )}
            </CommandList>
        </CommandDialog>
    );
}

export default SearchCommand;
