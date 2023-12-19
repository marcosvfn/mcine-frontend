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
import { useCurrentCinema } from "@/app/hooks/useCurrentCinema";
import { TicketsColumns } from "./columns";
import { TicketsActions } from "@/actions/tenant/tickets/api";

interface CellActionProps {
  data: TicketsColumns;
}

export default function CellAction(props: CellActionProps) {
  const { data } = props;
  const router = useRouter();
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const currentCinema = useCurrentCinema();

  const tenantId = String(params.idCinema);

  const onCopy = (id: string) => {
    navigator.clipboard.writeText(id);
    toast.success("Copiado para a área de transferência");
  };

  const onDelete = async () => {
    try {
      if (!currentCinema.info.isAdmin) {
        toast.error("Usuário sem permissão para excluir");
        return;
      }
      setLoading(true);
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
            onClick={() => onCopy(String(data.id))}
          >
            <Copy className="mr-2 h-4 w-4" />
            Copiar ID
          </DropdownMenuItem>{" "}
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
