import { SalasActions } from "@/actions/tenant/salas/api";
import SalaForm from "../components/salasForm";
import GetTenantAPIServer from "@/actions/tenant/TenantApiServer";
import { CheckUserAdmin } from "@/actions/checkUserAdmin";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import NoPermission from "@/components/base/noPermission";

interface SalaPagePros {
  params: {
    idCinema: string;
    id: string;
  };
}
export default async function SalaPage({ params }: SalaPagePros) {
  const session = await getServerSession(authOptions);

  const isUserAdmin = await CheckUserAdmin(
    Number(session?.user.id),
    params.idCinema
  );

  if (!isUserAdmin) return <NoPermission />;

  const serverApi = await GetTenantAPIServer(params.idCinema);

  const sala = await SalasActions.getOne(params.id, serverApi);

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SalaForm initialData={sala} />
      </div>
    </div>
  );
}
