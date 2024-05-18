import { create } from 'zustand';

export const useSettings = create((set, get) => {
    return {
        isOpen: false,
        onOpen: () => set({ isOpen: true }),
        onClose: () => set({ isOpen: false }),
    };
});
