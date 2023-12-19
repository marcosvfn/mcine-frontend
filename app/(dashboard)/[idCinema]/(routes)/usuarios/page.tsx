import GetRootAPIServer from "@/actions/root/RootApiServer";
import { CinemaActions } from "@/actions/root/cinema/api";
import { UsuarioActions } from "@/actions/root/usuario/api";
import NoPermission from "@/components/base/noPermission";
import { format } from "date-fns";
import { UsuarioColumns } from "./components/columns";
import UsuarioClient from "./components/usuarioClient";

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

  const allUsers = await UsuarioActions.getAll(await GetRootAPIServer());

  const formattedUsers: UsuarioColumns[] = allUsers.map((user) => ({
    id: user.id,
    createdAt: format(new Date(user.createdAt!), "dd/MM/yyyy"),
    nome: user.nome,
    email: user.email,
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <UsuarioClient data={formattedUsers} />
      </div>
    </div>
  );
}
