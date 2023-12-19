import GetRootAPIServer from "@/actions/root/RootApiServer";
import {
  FilmesActions,
  TotalArrecadadoReturn,
} from "@/actions/root/filmes/api";
import VisualizacoesPieChart from "./pieChart";
import BarChart from "./barChart";
import {
  CinemaActions,
  TotalArrecadadoAnoByCinema,
  TotalArrecadadoSemana,
} from "@/actions/root/cinema/api";
import Heading from "../base/heading";
import { Separator } from "../ui/separator";
import LineChart from "./lineCharts";
import UltimasVendas from "./ultimasVendas";
import RankingCinema from "./rankingCinema";
import NoPermission from "../base/noPermission";

interface GraphData {
  id: string;
  label: string;
  value: number;
  color: string;
}

interface CinemaRanking {
  nomeCinema: string;
  ranking: {
    nomeFilme: string;
    visualizacoes: number;
  }[];
}

export default async function AdminDashBoard({
  idCinema,
}: {
  idCinema: string;
}) {
  if (idCinema !== process.env.NEXT_APP_ROOT_TENANT_ID) return <NoPermission />;

  const apiServer = await GetRootAPIServer();

  const topVisualizacoesByCinemaAll =
    await FilmesActions.getFilmesMaisVisualizados(apiServer);

  const topVisualizacoesByCinemaSemana =
    await FilmesActions.getFilmesMaisVisualizadosSemana(apiServer);

  const { dataSet1: topFilmesAll, dataSet2: topCinemasAll } =
    generatePizzaGraphData(topVisualizacoesByCinemaAll);

  const { dataSet1: topFilmesSemana, dataSet2: topCinemasSemana } =
    generatePizzaGraphData(topVisualizacoesByCinemaSemana);

  const totalArrecadoByFilme = await FilmesActions.getTotalArrecadadoByFilme(
    apiServer
  );

  const {
    data: formattedTotalByFilme,
    keys: keysTotalByFilme,
    indexBy: indexByTotalByFilme,
  } = generateBarDataTotalArrecadadoByFilme(totalArrecadoByFilme);

  const totalArrecadadoByCinema = await CinemaActions.getTotalArrecadadoSemana(
    apiServer
  );

  const {
    data: formattedTotalByCinema,
    keys: keysTotalByCinema,
    indexBy: indexByTotalByCinema,
  } = generateBarDataTotalArrecadadoByCinema(totalArrecadadoByCinema);

  const totalArrecadadoNoAnoByCinema =
    await CinemaActions.getTotalArrecadadoAnoByCinema(apiServer);

  const formattedTotalArrecadadoNoAnoByCinema =
    generateBarDataTotalArrecadadoByCinemaAno(
      totalArrecadadoNoAnoByCinema
    ).filter((item) => item);

  const ultimasVendas = await CinemaActions.getUltimasVendas(apiServer);

  return (
    <div className="p-8 md:p-4 w-full">
      <Heading
        title="Visão Geral"
        description="Resumo global de faturamentos e desempenho dos cinemas cadastrados"
      />
      <Separator className="my-3 dark:bg-zinc-700" />
      <div className="grid grid-cols-10 gap-5">
        <div className="col-span-10 md:col-span-6 xl:col-span-7">
          <LineChart
            data={formattedTotalArrecadadoNoAnoByCinema}
            title="Faturamento Mensal no ano Corrente"
          />
        </div>
        <div className="col-span-10  md:col-span-4 xl:col-span-3">
          <UltimasVendas data={ultimasVendas} />
        </div>
        <div className="lg:col-span-5 col-span-10">
          <BarChart
            title="Total arrecadado por cinema na semana"
            data={formattedTotalByCinema}
            keys={keysTotalByCinema}
            indexBy={indexByTotalByCinema}
          />
        </div>
        <div className="col-span-10 lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-5">
          <VisualizacoesPieChart
            data={topFilmesAll}
            title="Top 3 filmes assistidos"
          />
          <VisualizacoesPieChart
            data={topFilmesSemana}
            title="Top 3 filmes assistidos na semana"
          />
        </div>
        <div className="lg:col-span-6 col-span-10">
          <BarChart
            title="Total arrecadado por filme"
            data={formattedTotalByFilme}
            keys={keysTotalByFilme}
            indexBy={indexByTotalByFilme}
          />
        </div>
        <div className="lg:col-span-4 grid grid-cols-1 col-span-10 gap-5">
          <RankingCinema data={topCinemasAll} title="Ranking de Vendas" />
          <RankingCinema
            data={topCinemasSemana}
            title="Ranking de Vendas na Semana"
          />
        </div>
      </div>
    </div>
  );
}

const colorPallete = [
  "#9d1d2c",
  "#ff8c58",
  "#c4929b",
  "#c54449",
  "#a86371",
  "#ff8c8a",
];

function generatePizzaGraphData(data: CinemaRanking[]): {
  dataSet1: GraphData[];
  dataSet2: GraphData[];
} {
  const moviesRanking: { [movie: string]: number } = {};
  const cinemasRanking: { [cinema: string]: number } = {};

  data.forEach((cinema) => {
    cinema.ranking.forEach((movie) => {
      moviesRanking[movie.nomeFilme] =
        (moviesRanking[movie.nomeFilme] || 0) + movie.visualizacoes;
      cinemasRanking[cinema.nomeCinema] =
        (cinemasRanking[cinema.nomeCinema] || 0) + movie.visualizacoes;
    });
  });

  const moviesDataSet: GraphData[] = Object.entries(moviesRanking)
    .map(([name, value], index) => ({
      id: name,
      label: name,
      value,
      color: colorPallete[index],
    }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 3);

  const cinemasDataSet: GraphData[] = Object.entries(cinemasRanking)
    .map(([name, value], index) => ({
      id: name,
      label: name,
      value,
      color: colorPallete[index],
    }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 3);

  return { dataSet1: moviesDataSet, dataSet2: cinemasDataSet };
}

function generateBarDataTotalArrecadadoByFilme(
  inputData: TotalArrecadadoReturn[]
) {
  const keys: string[] = [];
  if (inputData.length) {
    const fixedInputData = inputData.filter((item) => item);
    const data = fixedInputData.map((item, index) => {
      if (item) {
        keys.push(item.nomefilme);
        return {
          indexby: item.nomefilme,
          [item.nomefilme]: item.totalarrecadado,
          color: colorPallete[index % colorPallete.length],
        };
      }
    });

    return { data, keys, indexBy: "indexby" };
  }
  return { data: [], keys: [], indexBy: "" };
}

function generateBarDataTotalArrecadadoByCinema(
  inputData: TotalArrecadadoSemana[]
) {
  const keys: string[] = [];
  const fixedInputData = inputData.filter((item) => item);
  const data = fixedInputData
    .map((item, index) => {
      keys.push(item.cinemanome);
      return {
        indexby: item.cinemanome,
        [item.cinemanome]: item.totalarrecadado,
        color: colorPallete[index],
      };
    })
    .filter((item) => item);

  return { data, keys, indexBy: "indexby" };
}

export function generateBarDataTotalArrecadadoByCinemaAno(
  inputData: TotalArrecadadoAnoByCinema[]
) {
  if (inputData && inputData[0].id) {
    const fixedInputData = inputData.filter((item) => item);
    const data = fixedInputData.map((item, index) => {
      return {
        id: item.id,
        data: item.data.map((item) => ({
          ...item,
          color: colorPallete[index],
        })),
      };
    });

    return data;
  }
  return [];
}
