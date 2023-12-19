import GetRootAPIServer from "@/actions/root/RootApiServer";
import { CinemaActions } from "@/actions/root/cinema/api";
import NoPermission from "@/components/base/noPermission";
import { CinemaColumns } from "./components/columns";
import { format } from "date-fns";
import CinemaClient from "./components/cinemaClient";

export default async function CinemaPage({
  params,
}: {
  params: {
    idCinema: string;
  };
}) {
  if (params.idCinema !== process.env.NEXT_APP_ROOT_TENANT_ID) {
    return <NoPermission />;
  }

  const allCinemas = await CinemaActions.getAll(await GetRootAPIServer());

  const formattedCinemas: CinemaColumns[] = allCinemas.map((cinema) => ({
    id: cinema.id,
    createdAt: format(new Date(cinema.createdAt!), "dd/MM/yyyy"),
    nome: cinema.nome,
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CinemaClient data={formattedCinemas} />
      </div>
    </div>
  );
}
