"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import AlertModal from "@/components/modals/alertModal";
import { UserTicketsColumns } from "./columns";
import { SalasActions } from "@/actions/tenant/salas/api";
import { useCurrentCinema } from "@/app/hooks/useCurrentCinema";
import { TicketsActions } from "@/actions/tenant/tickets/api";
import { format, parse } from "date-fns";

interface CellActionProps {
  data: UserTicketsColumns;
}

export default function CellAction(props: CellActionProps) {
  const { data } = props;
  const router = useRouter();
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const tenantId = String(params.idCinema);

  const onDelete = async () => {
    try {
      setLoading(true);

      const canDelete =
        new Date(parse(data.dtSessao, "dd/MM/yyyy", new Date())) > new Date();

      if (!canDelete) {
        toast.error("Só é possível excluir tickets de sessões futuras");
        return;
      }

      const response = await TicketsActions.remove(String(data.id), tenantId);

      if (response.success) {
        router.refresh();
        toast.success("Ticket Excluído");
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error("Houve um problema ao excluir!");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={() => onDelete()}
        loading={loading}
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
            onClick={() => setOpen(true)}
          >
            <Trash className="mr-2 h-4 w-4" />
            Excluir
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
