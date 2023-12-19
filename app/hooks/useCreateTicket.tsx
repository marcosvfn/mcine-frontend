import { AssentosDisponiveisReturn } from "@/actions/tenant/assentos/api";
import { SessoesFilmesInfo } from "@/actions/tenant/salas/api";
import { create } from "zustand";

export type UserCredentials = {
  nomeReserva: string;
  cpfReserva: string;
};

interface UseCreateTicket {
  data: SessoesFilmesInfo | undefined;
  assentosData: AssentosDisponiveisReturn | undefined;
  credentials: UserCredentials | undefined;
  setData: (data: SessoesFilmesInfo | undefined) => void;
  setAssentosData: (
    assentosData: AssentosDisponiveisReturn | undefined
  ) => void;
  setCredentials: (credentials: UserCredentials | undefined) => void;
}

export const useCreateTicket = create<UseCreateTicket>((set, get) => ({
  assentosData: undefined,
  credentials: undefined,
  data: undefined,
  setData: (data) => set({ data: data }),
  setAssentosData: (data) => set({ assentosData: data }),
  setCredentials: (data) => set({ credentials: data }),
}));
