import { AxiosInstance } from "axios";
import { HttpResponse, handleDeleteResponse } from "../../protocols";
import GetRootAPIClient from "../RootApiClient";

const endpoint = `/filmes`;

export type FilmeModel = {
  id: string;
  nome: string;
  sinopse: string;
  capaUrl: string;
  disponivel: boolean;
  avaliacao: number;
  linkTrailer: string;
  dtLancamento: Date;
  createdAt: Date;
  updatedAt: Date;
};

async function getAll(serverApi?: AxiosInstance): Promise<FilmeModel[]> {
  const response = serverApi
    ? await serverApi.get(`${endpoint}/all`)
    : await GetRootAPIClient.get(`${endpoint}/all`);
  return response.data;
}

async function getOne(
  id: string,
  serverApi?: AxiosInstance
): Promise<(FilmeModel & { avaliacao: number }) | null> {
  const response = serverApi
    ? await serverApi.get(`${endpoint}/${id}`)
    : await GetRootAPIClient.get(`${endpoint}/${id}`);
  if (response && response.data) {
    return response.data;
  }
  return null;
}

async function create(data: Partial<FilmeModel>): Promise<FilmeModel> {
  const response = await GetRootAPIClient.post<FilmeModel>(
    `${endpoint}/new`,
    data
  );
  return response.data;
}

async function edit(
  id: string,
  data: Partial<FilmeModel>
): Promise<FilmeModel> {
  const response = await GetRootAPIClient.patch<FilmeModel>(
    `${endpoint}/${id}`,
    data
  );
  return response.data;
}

async function remove(id: string): Promise<HttpResponse> {
  const response = await GetRootAPIClient.delete(`${endpoint}/${id}`);
  return handleDeleteResponse(response);
}

async function getFilmesDisponiveis(
  serverApi?: AxiosInstance
): Promise<FilmeModel[]> {
  const response = serverApi
    ? await serverApi.get(`${endpoint}/disponiveis`)
    : await GetRootAPIClient.get(`${endpoint}/disponiveis`);
  return response.data;
}

export type TotalArrecadadoReturn = {
  idfilme: string;
  nomefilme: string;
  totalarrecadado: number;
};

async function getTotalArrecadadoByFilme(
  serverApi?: AxiosInstance
): Promise<TotalArrecadadoReturn[]> {
  const response = serverApi
    ? await serverApi.get(`${endpoint}/total`)
    : await GetRootAPIClient.get(`${endpoint}/total`);
  return response.data;
}

type Ranking = {
  nomeFilme: string;
  visualizacoes: number;
};

export type MaisVisualizadosReturn = {
  nomeCinema: string;
  ranking: Ranking[];
};

async function getFilmesMaisVisualizados(
  serverApi?: AxiosInstance
): Promise<MaisVisualizadosReturn[]> {
  const response = serverApi
    ? await serverApi.get(`${endpoint}/visualizacoes/all`)
    : await GetRootAPIClient.get(`${endpoint}/visualizacoes/all`);
  return response.data;
}

async function getFilmesMaisVisualizadosSemana(
  serverApi?: AxiosInstance
): Promise<MaisVisualizadosReturn[]> {
  const response = serverApi
    ? await serverApi.get(`${endpoint}/visualizacoes/semana`)
    : await GetRootAPIClient.get(`${endpoint}/visualizacoes/semana`);
  return response.data;
}
export interface CinemaSession {
  nomecinema: string;
  nomefilme: string;
  idcinema: string;
  idsessao: string;
  dtsessao: string;
  horainicio: string;
}

export interface SessoesDisponiveis {
  [key: string]: CinemaSession[];
}
async function getSessoesDisponiveis(
  idFilme: string,
  serverApi?: AxiosInstance
): Promise<SessoesDisponiveis> {
  const response = serverApi
    ? await serverApi.get(`${endpoint}/sessoes/${idFilme}`)
    : await GetRootAPIClient.get(`${endpoint}/sessoes/${idFilme}`);
  return response.data as SessoesDisponiveis;
}

export const FilmesActions = {
  getOne,
  getAll,
  create,
  edit,
  remove,
  getFilmesDisponiveis,
  getTotalArrecadadoByFilme,
  getFilmesMaisVisualizados,
  getFilmesMaisVisualizadosSemana,
  getSessoesDisponiveis,
};
