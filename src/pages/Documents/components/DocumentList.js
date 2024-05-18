import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from 'convex/react';

import { api } from '~/convex/_generated/api';
import Item from './Item';
import { FileIcon } from 'lucide-react';
import ItemSkeleton from './ItemSkeleton';

function DocumentList({ parentDocumentId, level = 0 }) {
    const params = useParams();

    const documents = useQuery(api.documents.getSidebar, {
        parentDocument: parentDocumentId,
    });

    const [expanded, setExpanded] = useState({});

    const onExpand = (documentId) => {
        setExpanded((prev) => ({
            ...prev,
            [documentId]: !prev[documentId],
        }));
    };

    const navigate = useNavigate();
    const onRedirect = (documentId) => {
        navigate(`/documents/${documentId}`);
    };

    if (documents === undefined) {
        return (
            <>
                <ItemSkeleton level={level} />
                {level === 0 && (
                    <>
                        <ItemSkeleton level={level} />
                        <ItemSkeleton level={level} />
                    </>
                )}
            </>
        );
    }

    return (
        <>
            <p
                style={{
                    paddingLeft: level ? `${level * 12 + 25}px` : undefined,
                }}
                className={`hidden text-sm font-medium text-muted-foreground/80 ${expanded && 'last:block'} ${
                    level === 0 && 'hidden'
                } `}
            >
                No pages inside
            </p>
            {documents.map((document) => (
                <div key={document._id}>
                    <Item
                        id={document._id}
                        onClick={() => onRedirect(document._id)}
                        label={document.title}
                        icon={FileIcon}
                        documentIcon={document.icon}
                        active={params.documentId === document._id}
                        level={level}
                        onExpand={() => onExpand(document._id)}
                        expanded={expanded[document._id]}
                    />
                    {expanded[document._id] && <DocumentList parentDocumentId={document._id} level={level + 1} />}
                </div>
            ))}
        </>
    );
}

export default DocumentList;
