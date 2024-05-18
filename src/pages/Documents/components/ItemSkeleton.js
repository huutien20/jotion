import React from 'react';

function ItemSkeleton({ level }) {
    return (
        <div style={{ paddingLeft: level ? `${level * 12 + 25}px` : '12px' }} className="flex gap-x-2 py-[3px]">
            <div className="animate-pulse h-4 w-4 bg-neutral-200 rounded-md"></div>
            <div className="animate-pulse h-4 w-[30%] bg-neutral-200 rounded-md"></div>
        </div>
    );
}

export default ItemSkeleton;
