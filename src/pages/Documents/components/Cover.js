import { useMutation } from 'convex/react';
import { deleteObject, getStorage, ref } from 'firebase/storage';
import { ImageIcon } from 'lucide-react';
import React from 'react';
import { useParams } from 'react-router-dom';
import { useMediaQuery } from 'usehooks-ts';
import { Button } from '~/components/Button';
import firebase from '~/config/firebaseConfig';
import { api } from '~/convex/_generated/api';
import { useCoverImage } from '~/hooks/useCoverImage';

function Cover({ coverImage, preview }) {
    const isMobile = useMediaQuery('(max-width: 768px)');
    const params = useParams();
    const coverImageModal = useCoverImage();
    const removeCoverImage = useMutation(api.documents.removeCoverImage);
    const storage = getStorage(firebase);

    const onRemove = async () => {
        try {
            await removeCoverImage({
                id: params.documentId,
            });
            const desertRef = ref(storage, `images/${coverImage.fileName}`);

            await deleteObject(desertRef);
        } catch (error) {
            console.error('Error deleting image:', error);
        }
    };

    return (
        <div
            className={`relative w-full h-[35vh] group ${!coverImage?.imageURL && '!h-[12vh]'} ${
                coverImage?.imageURL && 'bg-muted'
            }`}
        >
            {!!coverImage?.imageURL && (
                <img src={coverImage?.imageURL} alt="Cover" className="w-full h-full object-cover" />
            )}
            {!!coverImage?.imageURL && !preview && (
                <div
                    className={`opacity-0 group-hover:opacity-100 absolute bottom-5 right-5 flex items-center gap-x-2 ${
                        isMobile && 'opacity-100'
                    }`}
                >
                    <Button
                        onClick={() => coverImageModal.onReplace(coverImage.imageURL, coverImage.fileName)}
                        className="text-muted-foreground text-xs"
                        variant="secondary"
                    >
                        <ImageIcon className="h-4 w-4 mr-2" />
                        Change cover
                    </Button>

                    <Button onClick={onRemove} className="text-muted-foreground text-xs" variant="secondary">
                        <ImageIcon className="h-4 w-4 mr-2" />
                        Remove
                    </Button>
                </div>
            )}
        </div>
    );
}

export default Cover;
