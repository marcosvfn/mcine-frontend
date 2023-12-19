"use client";

import { ColumnDef } from "@tanstack/react-table";
import CellAction from "./cellActions";

export type UsuarioColumns = {
  id: number;
  nome: string;
  email: string;
  createdAt: string;
};

export const columns: ColumnDef<UsuarioColumns>[] = [
  {
    accessorKey: "nome",
    header: "Nome",
  },
  {
    accessorKey: "email",
    header: "Email",
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
