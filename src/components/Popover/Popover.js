import React, { useEffect, useRef, useState } from 'react';
import PopoverTrigger from './PopoverTrigger';
import PopoverContent from './PopoverContent';
import { createPortal } from 'react-dom';

function Popover({ children }) {
    const [isOpen, setIsOpen] = useState(false);
    const [popoverPosition, setPopoverPosition] = useState({ top: 0, left: 0 });
    const triggerRef = useRef(null);
    const contentRef = useRef(null);

    const childArray = React.Children.toArray(children);
    const triggerComponent = childArray.find((child) => child.type === PopoverTrigger);
    const contentComponent = childArray.find((child) => child.type === PopoverContent);

    useEffect(() => {
        const alertRoot = document.getElementById('alert-root');
        function handleClickOutside(e) {
            if (contentRef.current && triggerRef.current) {
                if (
                    !contentRef.current.contains(e.target) &&
                    !triggerRef.current.contains(e.target) &&
                    !alertRoot.contains(e.target)
                ) {
                    setIsOpen(false);
                }
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [contentRef]);

    useEffect(() => {
        if (isOpen && triggerRef.current && contentRef.current) {
            const triggerRect = triggerRef.current.getBoundingClientRect();
            let menuLeft = triggerRect.left;
            let menuTop = triggerRect.bottom;

            switch (contentComponent.props.side) {
                case 'top':
                    menuTop = triggerRect.top - contentRef.current.offsetHeight;
                    break;
                case 'left':
                    menuLeft = triggerRect.right - contentRef.current.offsetWidth;
                    break;
                default:
                    break;
            }

            setPopoverPosition({
                top: menuTop,
                left: menuLeft,
            });
        }
    }, [isOpen, contentComponent.props.side]);

    const togglePopover = (e) => {
        e.stopPropagation();
        setIsOpen(!isOpen);
    };

    const portalRoot = document.getElementById('portal-root');
    return (
        <div ref={triggerRef} className="relative">
            <div onClick={togglePopover}>{triggerComponent}</div>
            {isOpen &&
                createPortal(
                    <div
                        ref={contentRef}
                        style={{ top: popoverPosition.top, left: popoverPosition.left }}
                        className="absolute z-[99999]"
                    >
                        {contentComponent}
                    </div>,
                    portalRoot,
                )}
        </div>
    );
}

export default Popover;
