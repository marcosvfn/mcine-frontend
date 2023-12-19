import GetRootAPIServer from "@/actions/root/RootApiServer";
import NoPermission from "@/components/base/noPermission";
import { FilmesActions } from "@/actions/root/filmes/api";
import { FilmesColumns } from "./components/columns";
import FilmesClient from "./components/filmesClient";
import { format } from "date-fns";

export default async function UsuariosPage({
  params,
}: {
  params: {
    idCinema: string;
  };
}) {
  if (params.idCinema !== process.env.NEXT_APP_ROOT_TENANT_ID) {
    return <NoPermission />;
  }

  const allFilmes = await FilmesActions.getAll(await GetRootAPIServer());

  const formattedFilmes: FilmesColumns[] = allFilmes.map((filme) => ({
    id: filme.id,
    dtLancamento: format(new Date(filme.dtLancamento!), "dd/MM/yyyy"),
    createdAt: format(new Date(filme.createdAt!), "dd/MM/yyyy"),
    nome: filme.nome,
    sinopse: filme.sinopse,
    disponivel: filme.disponivel,
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <FilmesClient data={formattedFilmes} />
      </div>
    </div>
  );
}
