import React, { useEffect, useRef, useState } from 'react';
import DropdownMenuTrigger from './DropdownMenuTrigger';
import DropdownMenuContent from './DropdownMenuContent';
import { createPortal } from 'react-dom';

function DropdownMenu({ children }) {
    const [isOpen, setIsOpen] = useState(false);
    const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
    const menuRef = useRef(null);
    const triggerRef = useRef(null);

    const childArray = React.Children.toArray(children);
    const triggerComponent = childArray.find((child) => child.type === DropdownMenuTrigger);
    const contentComponent = childArray.find((child) => child.type === DropdownMenuContent);

    useEffect(() => {
        function handleClickOutside(e) {
            if (menuRef.current && triggerRef.current) {
                if (!menuRef.current.contains(e.target) && !triggerRef.current.contains(e.target)) {
                    setIsOpen(false);
                }
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [menuRef]);

    useEffect(() => {
        if (isOpen && triggerRef.current && menuRef.current) {
            const triggerRect = triggerRef.current.getBoundingClientRect();
            let menuLeft = triggerRect.left;
            let menuTop = triggerRect.bottom;

            switch (contentComponent.props.side) {
                case 'top':
                    menuTop = triggerRect.top - menuRef.current.offsetHeight;
                    break;
                case 'left':
                    menuLeft = triggerRect.right - menuRef.current.offsetWidth;
                    break;
                default:
                    break;
            }

            setMenuPosition({
                top: menuTop,
                left: menuLeft,
            });
        }
    }, [isOpen, contentComponent.props.side]);

    const toggleMenu = (e) => {
        e.stopPropagation();
        setIsOpen(!isOpen);
    };

    const portalRoot = document.getElementById('portal-root');
    return (
        <div className="relative">
            <div ref={triggerRef} onClick={toggleMenu}>
                {triggerComponent}
            </div>
            {isOpen &&
                createPortal(
                    <div
                        ref={menuRef}
                        className="absolute z-[99999]"
                        style={{ top: menuPosition.top, left: menuPosition.left }}
                    >
                        {contentComponent}
                    </div>,
                    portalRoot,
                )}
        </div>
    );
}

export default DropdownMenu;
