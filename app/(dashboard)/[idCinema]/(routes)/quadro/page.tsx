import GetTenantAPIServer from "@/actions/tenant/TenantApiServer";
import CantViewAsRoot from "@/components/base/cantViewAsRoot";
import { currencyFormatter } from "@/lib/utils";
import { format } from "date-fns";
import { SessoesColumns } from "../sessoes/components/columns";
import { SalasActions } from "@/actions/tenant/salas/api";
import NoData from "@/components/base/noData";
import QuadroClient from "./components/quadroClient";

export default async function QuadroHorariosPage({
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

  const sessoesBySala = await SalasActions.getQuadroDeHorarios(
    await GetTenantAPIServer(params.idCinema)
  );

  if (!sessoesBySala.length)
    return (
      <NoData text="Não existem sessões ou salas cadastras para este cinema!" />
    );

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <QuadroClient data={sessoesBySala} />
      </div>
    </div>
  );
}
