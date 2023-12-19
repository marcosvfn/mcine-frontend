import GetRootAPIServer from "@/actions/root/RootApiServer";
import { FilmesActions } from "@/actions/root/filmes/api";
import FilmeForm from "../components/filmesForm";
import { CheckUserAdmin } from "@/actions/checkUserAdmin";
import NoPermission from "@/components/base/noPermission";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

interface FilmePagePros {
  params: {
    idCinema: string;
    id: string;
  };
}
export default async function FilmePage({ params }: FilmePagePros) {
  const session = await getServerSession(authOptions);

  const isUserAdmin = await CheckUserAdmin(
    Number(session?.user.id),
    params.idCinema
  );

  if (!isUserAdmin) return <NoPermission />;

  const serverApi = await GetRootAPIServer();

  const filme = await FilmesActions.getOne(params.id, serverApi);

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <FilmeForm initialData={filme} />
      </div>
    </div>
  );
}
