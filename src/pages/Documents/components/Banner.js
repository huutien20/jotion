import { useMutation, useQuery } from 'convex/react';
import { deleteObject, getStorage, ref } from 'firebase/storage';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { Button } from '~/components/Button';
import firebase from '~/config/firebaseConfig';
import { api } from '~/convex/_generated/api';
import ConfirmModal from '~/modals/ConfirmModal';

function Banner({ documentId }) {
    const params = useParams();
    const navigate = useNavigate();
    const document = useQuery(api.documents.getById, {
        documentId: documentId,
    });
    const remove = useMutation(api.documents.remove);
    const restore = useMutation(api.documents.restore);

    const storage = getStorage(firebase);

    const onRemove = async () => {
        if (document.coverImage) {
            try {
                const storageRef = ref(storage, `images/${document.coverImage.fileName}`);
                await deleteObject(storageRef);
            } catch (error) {
                console.error('Error deleting image:', error);
            }
        }
        const promise = remove({ id: documentId });

        toast.promise(promise, {
            loading: 'Deleting note...',
            success: 'Note deleted!',
            error: 'Failed to delete note.',
        });

        if (params.documentId === documentId) {
            navigate('/documents');
        }
    };

    const onRestore = () => {
        const promise = restore({ id: documentId });

        toast.promise(promise, {
            loading: 'Restoring note...',
            success: 'Note restored!',
            error: 'Failed to restore note.',
        });
    };

    return (
        <div className="w-full bg-rose-500 text-center text-sm p-2 text-white flex items-center gap-x-2 justify-center">
            <p>This page is in the Trash.</p>

            <Button
                size="sm"
                onClick={onRestore}
                variant={'outline'}
                className="border border-white bg-transparent hover:bg-primary/5 dark:hover:bg-primary/10 text-white p-1 px-2 h-auto font-normal"
            >
                Restore page
            </Button>

            <ConfirmModal onConfirm={onRemove}>
                <Button
                    size="sm"
                    variant={'outline'}
                    className="border border-white bg-transparent hover:bg-primary/5 dark:hover:bg-primary/10 text-white p-1p px-2 h-auto font-normal"
                >
                    Delete forever
                </Button>
            </ConfirmModal>
        </div>
    );
}

export default Banner;
