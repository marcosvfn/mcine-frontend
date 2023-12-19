"use client";

import { ColumnDef } from "@tanstack/react-table";
import CellAction from "./cellActions";

export type TicketsColumns = {
  id: string;
  nomeReserva: string;
  cpfReserva: string;
  assento: string;
  createdAt: string;
};

export const columns: ColumnDef<TicketsColumns>[] = [
  {
    accessorKey: "nomeReserva",
    header: "Nome da Reserva",
  },
  {
    accessorKey: "cpfReserva",
    header: "CPF Reserva",
  },
  {
    accessorKey: "assento",
    header: "Nº Assento",
  },
  {
    accessorKey: "createdAt",
    header: "Data de compra",
  },
  {
    id: "Ações",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
