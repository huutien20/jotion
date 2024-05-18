import { useQuery } from 'convex/react';
import React from 'react';
import { api } from '~/convex/_generated/api';
import Cover from '../Documents/components/Cover';
import Toolbar from '../Documents/components/Toolbar';
import Editor from '../Documents/components/Editor';
import { useNavigate, useParams } from 'react-router-dom';
import { Spinner } from '~/components/Spinner';

function Preview() {
    const navigate = useNavigate();
    const params = useParams();
    const document = useQuery(api.documents.getById, { documentId: params.documentId });

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

    return (
        <div className="pb-40 dark:bg-[#1f1f1f] h-screen">
            <Cover preview coverImage={document.coverImage} />
            <div className="md:max-w-3xl lg:max-w-4xl mx-auto">
                <Toolbar preview initialData={document} />
                <Editor editable={false} initialContent={document.content} />
            </div>
        </div>
    );
}

export default Preview;
