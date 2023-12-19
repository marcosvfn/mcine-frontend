import { format } from "date-fns";
import GetTenantAPIServer from "@/actions/tenant/TenantApiServer";
import CantViewAsRoot from "@/components/base/cantViewAsRoot";
import { SessoesActions } from "@/actions/tenant/sessoes/api";
import { currencyFormatter } from "@/lib/utils";
import { SessoesColumns } from "./components/columns";
import SessoesClient from "./components/sessoesClient";

export default async function SessoesPage({
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

  const allSessoes = await SessoesActions.getAll(
    await GetTenantAPIServer(params.idCinema)
  );

  const noData = !allSessoes.length;

  const formattedSessoes: SessoesColumns[] = noData
    ? []
    : allSessoes.map((sessao) => ({
        id: String(sessao.id),
        createdAt: format(new Date(sessao.createdAt!), "dd/MM/yyyy"),
        nomeFilme: sessao.nomeFilme,
        horaInicio: String(sessao.horaInicio),
        dataSessao: format(new Date(sessao.dtSessao!), "dd/MM/yyyy"),
        nomeSala: sessao.sala.nome,
        vlEntrada: currencyFormatter.format(Number(sessao.vlEntrada)),
      }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SessoesClient data={formattedSessoes} />
      </div>
    </div>
  );
}
