import GetTenantAPIServer from "@/actions/tenant/TenantApiServer";
import TicketsClient from "./components/ticketsClient";
import NoData from "@/components/base/noData";
import { TicketsActions } from "@/actions/tenant/tickets/api";
import { AssentoActions } from "@/actions/tenant/assentos/api";

export default async function Page({
  params,
}: {
  params: {
    idCinema: string;
    id: string;
  };
}) {
  const tenatApiServer = await GetTenantAPIServer(params.idCinema);

  const sessionId = params.id;

  const ticketsInfoBySessao = await TicketsActions.getTicketsInfoBySessao(
    sessionId,
    tenatApiServer
  );

  if (!ticketsInfoBySessao) return <NoData />;

  const assentosDisponiveis = await AssentoActions.getAssentosDisponiveis(
    params.id,
    tenatApiServer
  );

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <TicketsClient
          data={ticketsInfoBySessao || []}
          assentosDisponiveis={assentosDisponiveis}
        />
      </div>{" "}
    </div>
  );
}
