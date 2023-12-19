import GetRootAPIServer from "@/actions/root/RootApiServer";
import { FilmesActions } from "@/actions/root/filmes/api";
import GetTenantAPIServer from "@/actions/tenant/TenantApiServer";
import { SessoesActions } from "@/actions/tenant/sessoes/api";
import NewTicketClient from "./components/newTicketClient";

interface NovoTicketPageProps {
  params: {
    idCinema: string;
    id: string;
  };
}

export default async function NovoTicketPage(props: NovoTicketPageProps) {
  const { params } = props;

  const tenatApiServer = await GetTenantAPIServer(params.idCinema);

  const sessionId = params.id;

  const infosSessao = await SessoesActions.getOne(sessionId, tenatApiServer);

  const filmeData = await FilmesActions.getOne(
    String(infosSessao?.idFilme),
    await GetRootAPIServer()
  );

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <NewTicketClient
          sessaoData={infosSessao}
          capaFilme={String(filmeData?.capaUrl)}
          avaliacao={Number(filmeData?.avaliacao)}
        />
      </div>
    </div>
  );
}
