import { useMutation, useQuery } from 'convex/react';
import React from 'react';
import { api } from '~/convex/_generated/api';
import Toolbar from './components/Toolbar';
import Cover from './components/Cover';
import Editor from './components/Editor';
import { useNavigate } from 'react-router-dom';
import { Spinner } from '~/components/Spinner';

function DocumentIdPage({ documentId }) {
    const document = useQuery(api.documents.getById, { documentId: documentId });
    const update = useMutation(api.documents.update);
    const navigate = useNavigate();

    if (document === null) {
        navigate('/error');
        return;
    }

    if (document === undefined) {
        return (
            <div className="h-screen w-screen flex items-center justify-center">
                <Spinner size="lg" />
            </div>
        );
    }

    const handleChangeEditor = (content) => {
        update({
            id: documentId,
            content,
        });
    };

    return (
        <div className="pb-40">
            <Cover coverImage={document.coverImage} />
            <div className="md:max-w-3xl lg:max-w-4xl mx-auto">
                <Toolbar initialData={document} />
                <Editor onChange={handleChangeEditor} initialContent={document.content} />
            </div>
        </div>
    );
}

export default DocumentIdPage;
