import { SalasActions } from "@/actions/tenant/salas/api";
import SalaForm from "../components/sessaoForm";
import GetTenantAPIServer from "@/actions/tenant/TenantApiServer";
import { CheckUserAdmin } from "@/actions/checkUserAdmin";
import { authOptions } from "@/lib/authOptions";
import NoPermission from "@/components/base/noPermission";
import { getServerSession } from "next-auth";
import { SessoesActions } from "@/actions/tenant/sessoes/api";
import SessaoForm from "../components/sessaoForm";
import { FilmesActions } from "@/actions/root/filmes/api";
import GetRootAPIServer from "@/actions/root/RootApiServer";

interface SessoesPagePros {
  params: {
    idCinema: string;
    id: string;
  };
}

export default async function SessoesPage({ params }: SessoesPagePros) {
  const session = await getServerSession(authOptions);

  const isUserAdmin = await CheckUserAdmin(
    Number(session?.user.id),
    params.idCinema
  );

  if (!isUserAdmin) return <NoPermission />;

  const tenatApiServer = await GetTenantAPIServer(params.idCinema);

  const sessao = await SessoesActions.getOne(params.id, tenatApiServer);

  const filmesDisponiveis = await FilmesActions.getFilmesDisponiveis(
    await GetRootAPIServer()
  );

  const salas = await SalasActions.getAll(tenatApiServer);

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SessaoForm
          initialData={sessao}
          filmesDisponiveis={filmesDisponiveis}
          salas={salas}
        />
      </div>
    </div>
  );
}
