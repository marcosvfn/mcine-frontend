import GetTenantAPIServer from "@/actions/tenant/TenantApiServer";
import Heading from "../base/heading";
import { Separator } from "../ui/separator";
import {
  SessoesActions,
  VisualizacoesReturn,
} from "@/actions/tenant/sessoes/api";
import UltimasVendas from "./ultimasVendas";
import VisualizacoesPieChart from "./pieChart";
import BarChart from "./barChart";
import LineChart from "./lineCharts";
import { generateBarDataTotalArrecadadoByCinemaAno } from "./adminDashBoard";

export default async function TenantDashBoard({
  idCinema,
}: {
  idCinema: string;
}) {
  const apiServer = await GetTenantAPIServer(idCinema);

  // Fetch
  const ultimasVendas = await SessoesActions.getUltimasVendasByCinema(
    idCinema,
    apiServer
  );

  const topFilmesVisualizados = await SessoesActions.getVisualizacoesByFilme(
    idCinema,
    apiServer
  );

  const topFilmesVisualizadosSemana =
    await SessoesActions.getVisualizacoesByFilmeSemana(idCinema, apiServer);

  const totalArrecadadoByFilme = await SessoesActions.getTotalArrecadadoByFilme(
    idCinema,
    apiServer
  );

  const faturamentoAnual = await SessoesActions.getFaturamentoAnual(
    idCinema,
    apiServer
  );

  // Format
  const {
    data: formattedTotalArrecadadoByFilme,
    keys: keysTotalArrecadadoByFilme,
    indexBy: indexByTotalArrecadadoByFilme,
  } = generateBarGraphData(totalArrecadadoByFilme);

  const formattedTopFilmesVisualizados = generatePizzaGraphData(
    topFilmesVisualizados
  );

  const formattedTopFilmesVisualizadosSemana = generatePizzaGraphData(
    topFilmesVisualizadosSemana
  );

  return (
    <div className="p-8 w-full">
      <Heading
        title="Visão Geral"
        description="Resumo de faturamentos, vendas e desempenho do cinema"
      />
      <Separator className="my-3" />

      <div className="grid grid-cols-10 gap-5">
        <div className="col-span-10 md:col-span-6 xl:col-span-7">
          <LineChart
            data={generateBarDataTotalArrecadadoByCinemaAno([faturamentoAnual])}
            title="Faturamento Mensal no ano Corrente"
            onlyOneCinema
          />
        </div>
        <div className="col-span-10  md:col-span-4 xl:col-span-3">
          <UltimasVendas data={ultimasVendas} />
        </div>
        <div className="col-span-10 lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-5">
          <VisualizacoesPieChart
            data={formattedTopFilmesVisualizados}
            title="Top filmes visualizados"
          />
          <VisualizacoesPieChart
            data={formattedTopFilmesVisualizadosSemana}
            title="Top filmes visualizados na semana"
          />
        </div>
        <div className="col-span-10 lg:col-span-5">
          <BarChart
            data={formattedTotalArrecadadoByFilme}
            keys={keysTotalArrecadadoByFilme}
            indexBy={indexByTotalArrecadadoByFilme}
            title="Total arrecadado por filme"
          />
        </div>
      </div>
    </div>
  );
}

const colorPallete = [
  "#9d1d2c",
  "#574240",
  "#c4929b",
  "#c54449",
  "#a86371",
  "#ff8c8a",
  "#ff8c58",
];

function generatePizzaGraphData(data: VisualizacoesReturn) {
  const sortedData = Object.keys(data)
    .map((movie, index) => ({
      id: movie,
      label: movie,
      value: Number(data[movie]),
      color: colorPallete[index % colorPallete.length],
    }))
    .sort((a, b) => b.value - a.value);

  return sortedData.slice(0, 3);
}

function generateBarGraphData(inputData: VisualizacoesReturn) {
  const keys: string[] = [];
  const data = Object.keys(inputData).map((movie, index) => {
    keys.push(movie);
    return {
      indexby: movie,
      [movie]: inputData[movie],
      color: colorPallete[index % colorPallete.length],
    };
  });

  return { data, keys, indexBy: "indexby" };
}
