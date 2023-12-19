"use client";

import { ColumnDef } from "@tanstack/react-table";
import CellAction from "./cellActions";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import ButtonUserCinemaNav from "./buttonUserCinemaNav";

export type CinemaColumns = {
  id: string;
  nome: string;
  createdAt: string;
};

export const columns: ColumnDef<CinemaColumns>[] = [
  {
    accessorKey: "nome",
    header: "Nome",
  },
  {
    id: "Usuários",
    header: "Usuários",
    cell: ({ row }) => <ButtonUserCinemaNav id={row.original.id} />,
  },
  {
    accessorKey: "createdAt",
    header: "Cadastrado em",
  },
  {
    id: "Ações",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
