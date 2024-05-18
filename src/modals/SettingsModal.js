import React, { useEffect, useState } from 'react';
import { CommandDialog } from '~/components/Command';
import { ThemeSwitcherButton } from '~/components/ThemeSwitcherButton';
import { useSettings } from '~/hooks/useSettings';

function SettingsModal() {
    const [isMounted, setIsMounted] = useState(false);
    const settings = useSettings();

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

    return (
        <CommandDialog open={settings.isOpen} onOpenChange={settings.onClose}>
            <h2 className="text-lg font-medium text-primary p-2">My Settings</h2>
            <div className="flex items-center justify-between p-2 border-t">
                <div className="flex flex-col gap-y-1">
                    <h4 className="text-base font-medium text-primary">Appearance</h4>
                    <p className="text-sm text-muted-foreground">Customize how Jotion looks on your device</p>
                </div>
                <ThemeSwitcherButton />
            </div>
        </CommandDialog>
    );
}

export default SettingsModal;
