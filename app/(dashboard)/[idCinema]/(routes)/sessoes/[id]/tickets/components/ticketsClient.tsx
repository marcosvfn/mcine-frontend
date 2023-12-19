"use client";

import { AssentosDisponiveisReturn } from "@/actions/tenant/assentos/api";
import { TicketInfoBySessaoReturn } from "@/actions/tenant/tickets/api";
import { useAssentoModal } from "@/app/hooks/useAssentosModal";
import Heading from "@/components/base/heading";
import { DataTable } from "@/components/tables/dataTable";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Plus, Sofa, Ticket } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { columns } from "./columns";
import { format } from "date-fns";

interface TicketsClientProps {
  data: TicketInfoBySessaoReturn;
  assentosDisponiveis: AssentosDisponiveisReturn | null;
}

export default function TicketsClient(props: TicketsClientProps) {
  const { data, assentosDisponiveis } = props;

  const assentosModal = useAssentoModal();
  const params = useParams();
  const router = useRouter();

  if (!assentosModal.readonly) {
    assentosModal.setReadonly(true);
  }

  const formattedTicketData = data.tickets.map((item) => ({
    id: item.id,
    nomeReserva: item.nomeReserva,
    cpfReserva: item.cpfReserva,
    createdAt: format(new Date(item.createdAt!), "dd/MM/yyyy"),
    assento: item.assento.numero,
  }));

  return (
    <>
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-3">
          <Ticket size={40} />
          <Heading
            title={`Tickets`}
            description={`Gerencie os tickets e os assentos da sessão`}
          />
        </span>
      </div>
      <Separator className="my-2 dark:bg-zinc-700" />
      <DataTable columns={columns} data={formattedTicketData} searchKey="">
        <span className="flex md:space-x-2 justify-end md:flex-row flex-col w-full md:w-auto gap-3 md:gap-0">
          <Button
            onClick={() => {
              assentosModal.onOpen(assentosDisponiveis!);
            }}
          >
            <Sofa className="mr-0 md:mr-2 " />
            Assentos Disponíves
          </Button>
          <Button
            onClick={() =>
              router.push(
                `/${params.idCinema}/sessoes/${params.id}/tickets/new`
              )
            }
            className="w-full md:w-auto"
          >
            <Plus className="mr-2 " />
            Nova Venda
          </Button>
        </span>
      </DataTable>
    </>
  );
}
