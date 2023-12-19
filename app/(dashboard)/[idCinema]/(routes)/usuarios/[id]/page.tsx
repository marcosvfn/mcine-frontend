import GetRootAPIServer from "@/actions/root/RootApiServer";
import { UsuarioActions } from "@/actions/root/usuario/api";
import UsuarioForm from "../components/usuarioForm";
import { CheckUserAdmin } from "@/actions/checkUserAdmin";
import { authOptions } from "@/lib/authOptions";
import NoPermission from "@/components/base/noPermission";
import { getServerSession } from "next-auth";

interface UsuarioPagePros {
  params: {
    idCinema: string;
    id: string;
  };
}
export default async function UsuarioPage({ params }: UsuarioPagePros) {
  const session = await getServerSession(authOptions);

  const isUserAdmin = await CheckUserAdmin(
    Number(session?.user.id),
    params.idCinema
  );

  if (!isUserAdmin) return <NoPermission />;

  const serverApi = await GetRootAPIServer();

  const usuario = await UsuarioActions.getOne(params.id, serverApi);

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <UsuarioForm initialData={usuario} />
      </div>
    </div>
  );
}
