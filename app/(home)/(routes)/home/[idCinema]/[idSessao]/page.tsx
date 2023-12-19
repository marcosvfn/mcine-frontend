import { SalasActions } from "@/actions/tenant/salas/api";
import GetTenantAPIServer from "@/actions/tenant/TenantApiServer";
import NewTicketLoginForm from "./components/newTicketLoginForm";

export default async function BuyTicketPage({
  params,
}: {
  params: {
    idCinema: string;
    idSessao: string;
  };
}) {
  const apiServerTenant = await GetTenantAPIServer(params.idCinema);

  const quadroData = await SalasActions.getQuadroDeHorarios(apiServerTenant);

  const sessao = quadroData
    .find((item) =>
      item.sessoes.find((item) => item.idSessao === params.idSessao)
    )
    ?.sessoes.filter((item) => item.idSessao === params.idSessao)[0];

  return (
    <div className="flex-col w-full">
      <div className="flex-1 space-y-4 w-full">
        <NewTicketLoginForm data={sessao} />
      </div>
    </div>
  );
}
