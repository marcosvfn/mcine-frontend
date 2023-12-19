import { create } from "zustand";

type CinemaInfos = {
  nome: string;
  id: string;
  isAdmin: boolean;
};
interface useCurrentCinema {
  info: CinemaInfos;
  setCurrentCinema: (cinema: CinemaInfos) => void;
}

export const useCurrentCinema = create<useCurrentCinema>((set) => ({
  info: {
    nome: "",
    id: "",
    isAdmin: false,
  },
  setCurrentCinema: (cinema) => set({ info: cinema }),
}));
