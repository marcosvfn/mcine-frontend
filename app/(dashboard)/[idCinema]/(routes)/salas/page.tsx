import { format } from "date-fns";
import { SalasActions } from "@/actions/tenant/salas/api";
import { SalasColumns } from "./components/columns";
import GetTenantAPIServer from "@/actions/tenant/TenantApiServer";
import CantViewAsRoot from "@/components/base/cantViewAsRoot";
import SalasClient from "./components/salasClient";

export default async function SalasPage({
  params,
}: {
  params: {
    idCinema: string;
  };
}) {
  const isRootTenant = params.idCinema === process.env.NEXT_APP_ROOT_TENANT_ID;

  if (isRootTenant) {
    return <CantViewAsRoot />;
  }

  const allSalas = await SalasActions.getAll(
    await GetTenantAPIServer(params.idCinema)
  );

  const noData = !allSalas.length;

  const formattedSalas: SalasColumns[] = noData
    ? []
    : allSalas.map((sala) => ({
        id: sala.id,
        createdAt: format(new Date(sala.createdAt!), "dd/MM/yyyy"),
        nome: sala.nome,
        capacidade: sala.capacidade,
      }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SalasClient data={formattedSalas} />
      </div>
    </div>
  );
}
