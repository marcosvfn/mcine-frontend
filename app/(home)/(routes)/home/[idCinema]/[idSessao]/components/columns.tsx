"use client";

import { ColumnDef } from "@tanstack/react-table";
import CellAction from "./cellActions";

export type UserTicketsColumns = {
  id: string;
  nomeFilme: string;
  dtSessao: string;
  horaInicio: string;
  nomeSala: string;
  assento: number;
  dtCompra: string;
  nomeReserva: string;
};

export const columns: ColumnDef<UserTicketsColumns>[] = [
  {
    accessorKey: "nomeFilme",
    header: "Filme",
  },
  {
    accessorKey: "dtSessao",
    header: "Data da Sessão",
  },
  {
    accessorKey: "horaInicio",
    header: "Horário",
  },
  {
    accessorKey: "nomeSala",
    header: "Sala",
  },
  {
    accessorKey: "assento",
    header: "Assento",
  },
  {
    accessorKey: "dtCompra",
    header: "Comprado em",
  },
  {
    id: "Ações",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
