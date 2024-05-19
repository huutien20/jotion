import { useUser } from '@clerk/clerk-react';
import { PlusCircle } from 'lucide-react';
import { useMutation } from 'convex/react';
import { toast } from 'sonner';

import { api } from '~/convex/_generated/api';
import Layout from './Layout';
import { Button } from '~/components/Button';
import { useNavigate, useParams } from 'react-router-dom';
import DocumentIdPage from './DocumentIdPage';
import images from '~/images';

function Documents() {
    const params = useParams();
    const navigate = useNavigate();
    const { user } = useUser();
    const createDocument = useMutation(api.documents.create);

    const onCreate = () => {
        const promise = createDocument({ title: 'Untitled' }).then((documentId) =>
            navigate(`/documents/${documentId}`),
        );

        toast.promise(promise, {
            loading: 'Creating a new note...',
            success: 'New note created!',
            error: 'Failed to create a new note.',
        });
    };

    return (
        <Layout>
            {!!params.documentId ? (
                <DocumentIdPage documentId={params.documentId} />
            ) : (
                <div className="h-full flex flex-col items-center justify-center space-y-4">
                    <img src={images.empty} alt="Empty" height={300} width={300} className="dark:hidden" />
                    <img src={images.empty_dark} alt="Empty" height={300} width={300} className="hidden dark:block" />

                    <h2>Welcome {user?.firstName} to Jotion</h2>

                    <Button variant="primary" onClick={onCreate}>
                        <PlusCircle size={16} className="mt-1" />
                        Create a note
                    </Button>
                </div>
            )}
        </Layout>
    );
}

export default Documents;
