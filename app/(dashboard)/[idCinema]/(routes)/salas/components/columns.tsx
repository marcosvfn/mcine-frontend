"use client";

import { ColumnDef } from "@tanstack/react-table";
import CellAction from "./cellActions";

export type SalasColumns = {
  id: string;
  nome: string;
  capacidade: number;
  createdAt: string;
};

export const columns: ColumnDef<SalasColumns>[] = [
  {
    accessorKey: "nome",
    header: "Nome",
  },
  {
    accessorKey: "capacidade",
    header: "Capacidade",
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
