import { useMutation, useQuery } from 'convex/react';
import { deleteObject, getStorage, ref } from 'firebase/storage';
import { Search, Trash2, Undo } from 'lucide-react';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { Spinner } from '~/components/Spinner';
import firebase from '~/config/firebaseConfig';
import { api } from '~/convex/_generated/api';
import ConfirmModal from '~/modals/ConfirmModal';

function TrashBox() {
    const params = useParams();
    const navigate = useNavigate();
    const storage = getStorage(firebase);
    const documents = useQuery(api.documents.getTrash);
    const restore = useMutation(api.documents.restore);
    const remove = useMutation(api.documents.remove);

    const [search, setSearch] = useState('');

    const filteredDocuments = documents?.filter((document) =>
        document.title.toLowerCase().includes(search.toLowerCase()),
    );

    const onClick = (documentId) => {
        navigate(`/documents/${documentId}`);
    };

    const onRestore = (e, documentId) => {
        e.stopPropagation();

        const promise = restore({ id: documentId });

        toast.promise(promise, {
            loading: 'Restoring note...',
            success: 'Note restored!',
            error: ' Failed to restore note.',
        });
    };

    const onRemove = async (documentId, coverImage) => {
        if (coverImage) {
            try {
                const storageRef = ref(storage, `images/${coverImage.fileName}`);
                await deleteObject(storageRef);
            } catch (error) {
                console.error('Error deleting image:', error);
            }
        }

        //TODO: delete images in content

        const promise = remove({ id: documentId });

        toast.promise(promise, {
            loading: 'Deleting note...',
            success: 'Note deleted!',
            error: ' Failed to delete note.',
        });

        if (params.documentId === documentId) {
            navigate('/documents');
        }
    };

    if (documents === undefined) {
        return (
            <div className="h-full p-4 flex items-center justify-center">
                <Spinner size="lg" />
            </div>
        );
    }

    return (
        <div className="text-sm">
            <div className="flex items-center gap-x-1 p-2">
                <Search size={16} className="cursor-pointer" />
                <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="h-7 flex-1 px-2 rounded-sm bg-secondary placeholder:text-muted-foreground focus-visible:ring-transparent"
                    placeholder="Filter by page title..."
                />
            </div>
            <div className="mt-2 px-1 pb-1">
                <p className="hidden last:block text-xs text-center text-muted-foreground">No documents found.</p>
                {filteredDocuments?.map((document) => (
                    <div
                        key={document._id}
                        role="button"
                        onClick={() => onClick(document._id)}
                        className="text-sm rounded-sm w-full hover:bg-primary/5 flex items-center justify-between text-primary"
                    >
                        <span className="p-1 truncate">{document.title}</span>
                        <div className="flex items-center gap-x-1">
                            <div
                                onClick={(e) => onRestore(e, document._id)}
                                role="button"
                                className="rounded-sm p-2 hover:bg-neutral-300 dark:hover:bg-neutral-600"
                            >
                                <Undo className="h-4 w-4 text-muted-foreground" />
                            </div>
                            <ConfirmModal onConfirm={() => onRemove(document._id, document.coverImage)}>
                                <div
                                    role="button"
                                    className="rounded-sm p-2 hover:bg-neutral-300 dark:hover:bg-neutral-600"
                                >
                                    <Trash2 className="h-4 w-4 text-muted-foreground" />
                                </div>
                            </ConfirmModal>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default TrashBox;
