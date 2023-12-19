import GetRootAPIServer from "@/actions/root/RootApiServer";
import { CinemaActions } from "@/actions/root/cinema/api";
import CinemaForm from "../components/cinemaForm";
import { CheckUserAdmin } from "@/actions/checkUserAdmin";
import NoPermission from "@/components/base/noPermission";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

interface CinemaPagePros {
  params: {
    idCinema: string;
    id: string;
  };
}
export default async function CinemaPage({ params }: CinemaPagePros) {
  const session = await getServerSession(authOptions);

  const isUserAdmin = await CheckUserAdmin(
    Number(session?.user.id),
    params.idCinema
  );

  if (!isUserAdmin) return <NoPermission />;

  const serverApi = await GetRootAPIServer();

  const usuariosCinema = await CinemaActions.getUsuariosByIdCinema(
    params.id,
    serverApi
  );

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CinemaForm initialData={usuariosCinema} />
      </div>
    </div>
  );
}
