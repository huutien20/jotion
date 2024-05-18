import { useMutation } from 'convex/react';
import React, { useRef, useState } from 'react';
import { Button } from '~/components/Button';
import { api } from '~/convex/_generated/api';

function Title({ initialData }) {
    const update = useMutation(api.documents.update);
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState(initialData.title || 'Untitled');
    const inputRef = useRef(null);

    const enableInput = () => {
        setTitle(initialData.title);
        setIsEditing(true);
        setTimeout(() => {
            inputRef.current?.focus();
            inputRef.current?.setSelectionRange(0, inputRef.current.value.length);
        }, 0);
    };

    const disableInput = () => {
        setIsEditing(false);
    };

    const handleChange = (e) => {
        setTitle(e.target.value);
        update({
            id: initialData._id,
            title: e.target.value || 'Untitled',
        });
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            disableInput();
        }
    };

    return (
        <div className="flex items-center gap-x-1">
            {!!initialData.icon && <p>{initialData.icon}</p>}
            {isEditing ? (
                <input
                    ref={inputRef}
                    onClick={enableInput}
                    onBlur={disableInput}
                    onKeyDown={handleKeyDown}
                    value={title}
                    onChange={handleChange}
                    className="h-7 px-2 bg-transparent focus-visible:ring-transparent border-none"
                />
            ) : (
                <Button onClick={enableInput} variant={'ghost'} size="sm" className="font-normal h-auto p-1">
                    <span className="truncate">{initialData?.title}</span>
                </Button>
            )}
        </div>
    );
}

export default Title;
