"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Edit, MoreHorizontal, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";
import AlertModal from "@/components/modals/alertModal";
import { UserCinemaColumns } from "./usersCinemaSelector";
import { useCinemaUserList } from "@/app/hooks/useCinemaUserList";

interface CellActionProps {
  data: UserCinemaColumns;
}

export default function UserCinemaCellActions(props: CellActionProps) {
  const { data } = props;
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const userCinemaList = useCinemaUserList();

  const onDelete = async () => {
    try {
      userCinemaList.deleteUser(data.id);
      router.refresh();
      toast.success("Usuário removido! Salve as alterações para guardar.");
    } catch (error) {
      toast.error("Houve um problema ao remover!");
    } finally {
      setOpen(false);
    }
  };

  const currentUser = userCinemaList.currentList.find(
    (item) => item.id === data.id
  );

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={() => onDelete()}
        loading={false}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Abrir o Menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Ações</DropdownMenuLabel>
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => {
              if (currentUser) {
                const newUserPermission = {
                  ...currentUser,
                  isAdmin: !currentUser!.isAdmin,
                };
                userCinemaList.editUser(newUserPermission);
              }
            }}
          >
            <Edit className="mr-2 h-4 w-4" />
            {currentUser?.isAdmin
              ? "Tornar usuário padrão"
              : "Tornar Administrador"}
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => {
              setOpen(true);
            }}
          >
            <Trash className="mr-2 h-4 w-4" />
            Excluir
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
