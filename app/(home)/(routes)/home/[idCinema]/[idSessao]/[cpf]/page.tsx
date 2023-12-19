import { SalasActions } from "@/actions/tenant/salas/api";
import GetTenantAPIServer from "@/actions/tenant/TenantApiServer";
import { AssentoActions } from "@/actions/tenant/assentos/api";
import { redirect } from "next/navigation";
import NewTicketClientCinema from "../components/newTicketClientCinema";
import { TicketsActions } from "@/actions/tenant/tickets/api";
import { UserTicketsColumns } from "../components/columns";
import { format } from "date-fns";

export default async function BuyTicketPage({
  params,
}: {
  params: {
    idCinema: string;
    idSessao: string;
    cpf: string;
  };
}) {
  let regex = /^\d{11}$/;

  if (!regex.test(params.cpf))
    redirect(`/home/${params.idCinema}}/${params.idSessao}`);

  const apiServerTenant = await GetTenantAPIServer(params.idCinema);

  const quadroData = await SalasActions.getQuadroDeHorarios(apiServerTenant);

  const sessao = quadroData
    .find((item) =>
      item.sessoes.find((item) => item.idSessao === params.idSessao)
    )
    ?.sessoes.filter((item) => item.idSessao === params.idSessao)[0];

  const assentosData = await AssentoActions.getAssentosDisponiveis(
    params.idSessao,
    apiServerTenant
  );

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
        <NewTicketClientCinema
          data={sessao}
          assentos={assentosData}
          existingTickets={formattedTickets}
        />
      </div>
    </div>
  );
}
