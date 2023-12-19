import GetTenantAPIServer from "@/actions/tenant/TenantApiServer";
import { redirect } from "next/navigation";
import { format } from "date-fns";
import { TicketsActions } from "@/actions/tenant/tickets/api";
import { UserTicketsColumns } from "../../../[idCinema]/[idSessao]/components/columns";
import ViewTicketClient from "../../components/viewTicketsClient";

export default async function BuyTicketPage({
  params,
}: {
  params: {
    idCinema: string;
    cpf: string;
  };
}) {
  let regex = /^\d{11}$/;

  if (!regex.test(params.cpf)) redirect(`/home/login`);

  const apiServerTenant = await GetTenantAPIServer(params.idCinema);

  const ticketByCpf = await TicketsActions.getTicketsByCpf(
    params.cpf,
    apiServerTenant
  );

  const formattedTickets: UserTicketsColumns[] = ticketByCpf.map((ticket) => ({
    id: ticket.id,
    assento: ticket.assento.numero,
    dtCompra: format(new Date(ticket.createdAt), "dd/MM/yyyy"),
    dtSessao: format(new Date(ticket.sessao.dtSessao), "dd/MM/yyyy"),
    horaInicio: ticket.sessao.horaInicio,
    nomeFilme: ticket.nomeFilme,
    nomeSala: ticket.sessao.sala.nome,
    nomeReserva: ticket.nomeReserva,
  }));

  return (
    <div className="flex-col w-full">
      <div className="flex-1 space-y-4 w-full">
        <ViewTicketClient existingTickets={formattedTickets} />
      </div>
    </div>
  );
}
