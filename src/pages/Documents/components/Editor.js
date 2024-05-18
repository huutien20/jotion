import { BlockNoteView } from '@blocknote/mantine';
import { useCreateBlockNote } from '@blocknote/react';
import useTheme from '~/hooks/useTheme';
import '@blocknote/mantine/style.css';
import '@blocknote/core/fonts/inter.css';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import firebase from '~/config/firebaseConfig';

function Editor({ initialContent, onChange = () => {}, editable }) {
    const { theme } = useTheme();
    const storage = getStorage(firebase);

    const handleUpload = async (file) => {
        const fileName = Date.now() + file.name;
        const storageRef = ref(storage, `images/${fileName}`);
        await uploadBytes(storageRef, file);

        const imageURL = await getDownloadURL(storageRef);
        return imageURL;
    };

    const editor = useCreateBlockNote({
        initialContent: initialContent ? JSON.parse(initialContent) : undefined,
        uploadFile: handleUpload,
    });

    return (
        <div>
            <BlockNoteView
                editable={editable}
                onChange={() => onChange(JSON.stringify(editor.document, null, 2))}
                editor={editor}
                theme={theme === 'Dark' ? 'dark' : 'light'}
            />
        </div>
    );
}

export default Editor;
