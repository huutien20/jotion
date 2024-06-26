import { useMutation } from 'convex/react';
import { ImageIcon, Smile, X } from 'lucide-react';
import React, { useRef, useState } from 'react';
import ReactTextareaAutosize from 'react-textarea-autosize';
import { useMediaQuery } from 'usehooks-ts';
import { Button } from '~/components/Button';
import IconPicker from '~/components/IconPicker';
import { api } from '~/convex/_generated/api';
import { useCoverImage } from '~/hooks/useCoverImage';

function Toolbar({ initialData, preview }) {
    const isMobile = useMediaQuery('(max-width: 768px)');
    const inputRef = useRef(null);
    const [isEditing, setIsEditing] = useState(false);
    const [value, setValue] = useState(initialData.title);

    const coverImage = useCoverImage();

    const update = useMutation(api.documents.update);
    const removeIcon = useMutation(api.documents.removeIcon);

    const enableInput = () => {
        if (preview) return;
        setIsEditing(true);
        setTimeout(() => {
            setValue(initialData.title);
            inputRef.current?.focus();
            inputRef.current?.setSelectionRange(0, inputRef.current.value.length);
        }, 0);
    };

    const disableInput = () => setIsEditing(false);

    const onInput = (value) => {
        setValue(value);
        update({
            id: initialData._id,
            title: value || 'Untitled',
        });
    };

    const onKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            disableInput();
        }
    };

    const onIconSelect = (icon) => {
        update({
            id: initialData._id,
            icon,
        });
    };

    const onRemoveIcon = () => {
        removeIcon({
            id: initialData._id,
        });
    };

    return (
        <div className="pl-[54px] group relative">
            {!!initialData.icon && !preview && (
                <div className="group/icon flex items-center gap-x-2 pt-6">
                    <IconPicker onChange={onIconSelect}>
                        <p className="text-6xl hover:opacity-75 transition">{initialData.icon}</p>
                    </IconPicker>
                    <Button
                        onClick={onRemoveIcon}
                        className={
                            'rounded-full opacity-0 group-hover/icon:opacity-100 transition text-muted-foreground text-xs'
                        }
                        variant={'outline'}
                        size="icon"
                    >
                        <X className="h-4 w-4" />
                    </Button>
                </div>
            )}
            {!!initialData.icon && preview && <p className="text-6xl pt-6">{initialData.icon}</p>}
            <div
                className={`opacity-0 group-hover:opacity-100 flex items-center gap-x-1 py-4 ${
                    isMobile && 'opacity-100'
                }`}
            >
                {!initialData.icon && !preview && (
                    <IconPicker asChild onChange={onIconSelect}>
                        <Button className={'text-muted-foreground text-xs'} variant={'outline'}>
                            <Smile className="h-4 w-4" />
                            Add icon
                        </Button>
                    </IconPicker>
                )}
                {!initialData.coverImage && !preview && (
                    <Button onClick={coverImage.onOpen} className={'text-muted-foreground text-xs'} variant={'outline'}>
                        <ImageIcon className="h-4 w-4" />
                        Add cover
                    </Button>
                )}
            </div>
            {isEditing && !preview ? (
                <ReactTextareaAutosize
                    ref={inputRef}
                    onBlur={disableInput}
                    onKeyDown={onKeyDown}
                    value={value}
                    onChange={(e) => onInput(e.target.value)}
                    className="text=5xl bg-transparent font-bold break-words outline-none text-[#3f3f3f] dark:text-[#cfcfcf] resize-none"
                />
            ) : (
                <div
                    onClick={enableInput}
                    className="pb-[11.5px] text-5xl font-bold break-words outline-none text-[#3f3f3f] dark:text-[#cfcfcf]"
                >
                    {initialData.title}
                </div>
            )}
        </div>
    );
}

export default Toolbar;
