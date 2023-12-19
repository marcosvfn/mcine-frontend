"use client";

import { UsuarioCinemaModel } from "@/actions/root/cinema/api";
import { DataTable } from "@/components/tables/dataTable";
import { Badge } from "@/components/ui/badge";
import { ColumnDef } from "@tanstack/react-table";
import { UseFormReturn } from "react-hook-form";
import { CinemaFormValues } from "./cinemaForm";
import UserCinemaCellActions from "./userCinemaCellActions";
import { useCinemaUserList } from "@/app/hooks/useCinemaUserList";
import { useEffect } from "react";
import { UserCinemaDataTable } from "./userCinemaDataTable";

interface UsersCinemaSelectorProps {
  initialData: UsuarioCinemaModel[] | null;
}

export type UserCinemaColumns = {
  id: number;
  nome: string;
  email: string;
  isAdmin: boolean;
};

const columns: ColumnDef<UserCinemaColumns>[] = [
  {
    accessorKey: "nome",
    header: "Nome",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "isAdmin",
    header: "Permissão",
    cell: ({ row }) =>
      row.original.isAdmin ? (
        <Badge variant={"default"}>Administrador</Badge>
      ) : (
        <Badge variant={"secondary"}>Padrão</Badge>
      ),
  },
  {
    id: "Ações",
    cell: ({ row }) => <UserCinemaCellActions data={row.original} />,
  },
];

export default function UsersCinemaSelector(props: UsersCinemaSelectorProps) {
  const { initialData } = props;

  const cinemaUserList = useCinemaUserList();

  useEffect(() => {
    if (
      initialData &&
      initialData.length > 0 &&
      cinemaUserList.idCinema !== initialData[0].idCinema
    ) {
      const formattedData = initialData.map((item) => ({
        id: item.idUsuario,
        nome: String(item.user.nome),
        email: String(item.user.email),
        isAdmin: item.isAdmin,
      }));
      cinemaUserList.setIdCinema(initialData[0].idCinema);
      cinemaUserList.setList(formattedData);
    }
  }, [initialData, cinemaUserList]);

  return (
    <div>
      <UserCinemaDataTable
        columns={columns}
        data={cinemaUserList.currentList || []}
        searchKey="nome"
      />
    </div>
  );
}
