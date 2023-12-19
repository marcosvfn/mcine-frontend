import { AssentosDisponiveisReturn } from "@/actions/tenant/assentos/api";
import { create } from "zustand";

interface useAssentoModal {
  isOpen: boolean;
  readonly: boolean;
  selectedAssentosId: string[];
  selectedAssentosNumero: number[];
  data?: AssentosDisponiveisReturn;
  onOpen: (data: AssentosDisponiveisReturn) => void;
  onClose: () => void;
  setReadonly: (value: boolean) => void;
  setSelectedAssentosId: (value: string[]) => void;
  setSelectedAssentosNumero: (value: number[]) => void;
}

export const useAssentoModal = create<useAssentoModal>((set) => ({
  isOpen: false,
  readonly: false,
  data: undefined,
  onOpen: (data: AssentosDisponiveisReturn) =>
    set({
      data: data,
      isOpen: true,
    }),
  onClose: () => set({ isOpen: false }),
  setReadonly: (value) => set({ readonly: value }),
  setSelectedAssentosId: (value) => set({ selectedAssentosId: value }),
  selectedAssentosId: [],
  setSelectedAssentosNumero: (value) => set({ selectedAssentosNumero: value }),
  selectedAssentosNumero: [],
}));
