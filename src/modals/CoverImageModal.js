import { useMutation } from 'convex/react';
import { CloudUpload } from 'lucide-react';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

import { deleteObject, getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';

import { CommandDialog } from '~/components/Command';
import { api } from '~/convex/_generated/api';
import { useCoverImage } from '~/hooks/useCoverImage';
import firebase from '~/config/firebaseConfig';
import { Spinner } from '~/components/Spinner';
import { toast } from 'sonner';

function CoverImageModal() {
    const params = useParams();
    const update = useMutation(api.documents.update);
    const coverImage = useCoverImage();
    const storage = getStorage(firebase);

    const [file, setFile] = useState(undefined);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [dragging, setDragging] = useState(false);

    const onClose = () => {
        setFile(undefined);
        setIsSubmitting(false);
        coverImage.onClose();
    };

    const uploadImage = async (file) => {
        if (file) {
            setIsSubmitting(true);
            setFile(file);

            const fileName = Date.now() + file.name;

            try {
                if (coverImage.fileName) {
                    const desertRef = ref(storage, `images/${coverImage.fileName}`);
                    await deleteObject(desertRef);
                }
                const storageRef = ref(storage, `images/${fileName}`);

                await uploadBytes(storageRef, file);

                const imageURL = await getDownloadURL(storageRef);

                await update({
                    id: params.documentId,
                    coverImage: {
                        imageURL,
                        fileName,
                    },
                });

                toast.success('Image uploaded successfully!');

                onClose();
            } catch (error) {
                console.error('Error uploading file:', error);
            }
        }
    };

    const handleChange = (e) => {
        const file = e.target.files[0];
        uploadImage(file);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setDragging(false);
        const file = e.dataTransfer.files[0];
        if (file) {
            uploadImage(file);
        }
    };

    return (
        <CommandDialog open={coverImage.isOpen} onOpenChange={coverImage.onClose}>
            <h2 className="text-lg font-medium text-primary text-center p-2">Cover Image</h2>
            <div
                className={`m-3 h-40 flex-1 border border-dashed rounded-md ${
                    dragging ? 'border-primary' : 'border-muted-foreground'
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
            >
                {!file ? (
                    <>
                        <input
                            id="uploadImage"
                            name="uploadImage"
                            type="file"
                            accept="image/*"
                            onChange={handleChange}
                            className="hidden"
                            disabled={isSubmitting}
                        />
                        <label
                            htmlFor="uploadImage"
                            className="w-full h-full flex flex-col gap-y-2 items-center justify-center text-muted-foreground cursor-pointer"
                        >
                            <CloudUpload className="h-6 w-6" />
                            <p className="text-sm">Click or drag file to this area to upload</p>
                        </label>
                    </>
                ) : (
                    <div className="w-full h-full flex items-center justify-center">
                        <Spinner size="lg" />
                    </div>
                )}
            </div>
        </CommandDialog>
    );
}

export default CoverImageModal;
