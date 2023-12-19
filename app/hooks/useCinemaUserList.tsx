import { create } from "zustand";

export type userCinemaList = {
  id: number;
  nome: string;
  email: string;
  isAdmin: boolean;
};

interface useCinemaUserList {
  idCinema: string;
  currentList: userCinemaList[];
  editUser: (user: userCinemaList) => void;
  deleteUser: (id: number) => void;
  addUser: (user: userCinemaList) => void;
  setList: (list: userCinemaList[]) => void;
  setIdCinema: (id: string) => void;
}

export const useCinemaUserList = create<useCinemaUserList>((set, get) => ({
  idCinema: "",
  currentList: [],
  deleteUser: (id) => {
    const actualList = get().currentList;
    set({ currentList: actualList.filter((item) => item.id !== id) });
  },
  addUser: (user) => {
    const actualList = get().currentList;
    set({ currentList: [...actualList, user] });
  },
  setIdCinema: (id) => set({ idCinema: id }),
  setList: (list) => set({ currentList: list }),
  editUser: (user) => {
    const { currentList } = get();
    const updatedList = currentList.map((item) =>
      item.id === user.id ? { ...item, ...user } : item
    );
    set({ currentList: updatedList });
  },
}));
