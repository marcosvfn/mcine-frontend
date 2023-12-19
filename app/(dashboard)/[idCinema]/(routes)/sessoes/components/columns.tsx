"use client";

import { ColumnDef } from "@tanstack/react-table";
import CellAction from "./cellActions";
import NavButtonToTickets from "./navButtonToAssentos";

export type SessoesColumns = {
  id: string;
  nomeFilme: string;
  nomeSala: string;
  horaInicio: string;
  vlEntrada: string;
  dataSessao: string;
  createdAt: string;
};

export const columns: ColumnDef<SessoesColumns>[] = [
  {
    accessorKey: "nomeFilme",
    header: "Filme",
  },
  {
    accessorKey: "nomeSala",
    header: "Sala",
  },
  {
    accessorKey: "horaInicio",
    header: "Hora de Início",
  },
  {
    accessorKey: "vlEntrada",
    header: "Valor da Entrada",
  },
  {
    accessorKey: "dataSessao",
    header: "Data",
  },
  {
    id: "Tickets",
    header: "Tickets e Assentos",
    cell: ({ row }) => <NavButtonToTickets data={row.original} />,
  },
  {
    id: "Ações",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
