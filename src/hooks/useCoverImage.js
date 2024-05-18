import { create } from 'zustand';

export const useCoverImage = create((set) => ({
    url: undefined,
    fileName: undefined,
    isOpen: false,
    onOpen: () => set({ isOpen: true, url: undefined, fileName: undefined }),
    onClose: () => set({ isOpen: false, url: undefined, fileName: undefined }),
    onReplace: (url, fileName) => set({ isOpen: true, url, fileName }),
}));
