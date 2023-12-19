"use client";

import { ColumnDef } from "@tanstack/react-table";
import CellAction from "./cellActions";
import { Badge } from "@/components/ui/badge";

export type FilmesColumns = {
  id: string;
  nome: string;
  sinopse: string;
  disponivel: boolean;
  dtLancamento: string;
  createdAt: string;
};

export const columns: ColumnDef<FilmesColumns>[] = [
  {
    accessorKey: "nome",
    header: "Nome",
  },
  {
    accessorKey: "dtLancamento",
    header: "Data Lançamento",
  },
  {
    accessorKey: "disponivel",
    header: "Status",
    cell: ({ row }) =>
      row.original.disponivel ? (
        <Badge className="bg-green-700 hover:bg-green-700">Disponível</Badge>
      ) : (
        <Badge variant={"destructive"}>Indisponível</Badge>
      ),
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
