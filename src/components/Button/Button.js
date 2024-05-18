import { SignInButton } from '@clerk/clerk-react';
import React from 'react';

function Button({ children, type, variant, rounded, size = 'default', className, onClick: handleClick }) {
    var ButtonType = '';
    if (type === 'sign-in') {
        ButtonType = SignInButton;
    } else {
        ButtonType = 'button';
    }

    const defaultClasses =
        'flex items-center justify-center gap-1 rounded-md cursor-pointer border-black text-base active:scale-95';

    const variantClasses = {
        primary:
            'bg-black text-white font-semibold hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90',
        secondary: 'font-semibold bg-neutral-200 text-neutral-700 hover:bg-neutral-300 hover:text-neutral-800',
        outline:
            'font-semibold border border-primary bg-none text-primary hover:bg-neutral-200 dark:hover:bg-neutral-600',
        ghost: 'font-semibold bg-none hover:bg-black/5 hover:text-black dark:hover:bg-white/5 dark:hover:text-white',
        icon: 'w-8 h-8 px-0 py-0 bg-black text-white hover:bg-black/90',
    };

    const sizeClasses = {
        sm: '!px-2 !py-1',
        md: '!px-4 !py-2',
        lg: '!px-6 !py-3',
        default: '!px-4 !py-2',
    };

    return (
        <ButtonType
            mode="modal"
            className={`${defaultClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${
                rounded && '!rounded-full'
            } ${className}`}
            onClick={handleClick}
        >
            {children}
        </ButtonType>
    );
}

export default Button;
