import { create } from "zustand";

interface useCinemaModal {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useCinemaModal = create<useCinemaModal>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
