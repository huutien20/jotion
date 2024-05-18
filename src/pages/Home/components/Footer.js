import React from 'react';
import Logo from './Logo';
import { Button } from '~/components/Button';

function Footer() {
    return (
        <div className="flex items-center w-full p-6 bg-background dark:bg-[#1f1f1f]">
            <Logo />
            <div className="md:ml-auto w-full flex justify-between md:justify-end items-center gap-x-2 text-muted-foreground">
                <Button variant={'ghost'}>Privacy Policy</Button>
                <Button variant={'ghost'}>Terms & Conditions</Button>
            </div>
        </div>
    );
}

export default Footer;
