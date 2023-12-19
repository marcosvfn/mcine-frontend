import { AxiosInstance } from "axios";
import { HttpResponse, handleDeleteResponse } from "../../protocols";
import GetTenantApiClient from "../TenantApiClient";
import { FilmeModel, FilmesActions } from "@/actions/root/filmes/api";
import GetRootAPIServer from "@/actions/root/RootApiServer";

const endpoint = `/sala`;

export type SalaModel = {
  id: string;
  nome: string;
  idCinema: string;
  capacidade: number;
  createdAt: Date;
  updatedAt: Date;
};

export type SessoesFilmesInfo = {
  idCinema: string;
  idSessao: string;
  idFilme: string;
  dataSessao: string;
  horaInicio: string;
  nomeFilme: string;
  vlEntrada: number;
  capaUrl: string;
  avaliacao: number;
  sinopse: string;
};

export type QuadroDeHorariosType = {
  nome: string;
  sessoes: SessoesFilmesInfo[];
};

async function getAll(
  serverApi?: AxiosInstance,
  tenantId?: string
): Promise<SalaModel[]> {
  const response = serverApi
    ? await serverApi.get(`${endpoint}/all`)
    : await GetTenantApiClient(tenantId!).get(`${endpoint}/all`);
  return response.data;
}

async function getOne(
  id: string,
  serverApi?: AxiosInstance,
  tenantId?: string
): Promise<SalaModel | null> {
  const response = serverApi
    ? await serverApi.get(`${endpoint}/${id}`)
    : await GetTenantApiClient(tenantId!).get(`${endpoint}/${id}`);
  if (response && response.data) {
    return response.data;
  }
  return null;
}

async function create(
  data: Partial<SalaModel>,
  tenantId: string
): Promise<SalaModel> {
  const response = await GetTenantApiClient(tenantId).post<SalaModel>(
    `${endpoint}/new`,
    data
  );
  return response.data;
}

async function edit(
  id: string,
  data: Partial<SalaModel>,
  tenantId: string
): Promise<SalaModel> {
  const response = await GetTenantApiClient(tenantId).patch<SalaModel>(
    `${endpoint}/${id}`,
    data
  );
  return response.data;
}

async function remove(id: string, tenantId: string): Promise<HttpResponse> {
  const response = await GetTenantApiClient(tenantId).delete(
    `${endpoint}/${id}`
  );
  return handleDeleteResponse(response);
}

async function getQuadroDeHorarios(
  serverApi?: AxiosInstance,
  tenantId?: string
): Promise<QuadroDeHorariosType[]> {
  const response = serverApi
    ? await serverApi.get<QuadroDeHorariosType[]>(`${endpoint}/quadro`)
    : await GetTenantApiClient(tenantId!).get<QuadroDeHorariosType[]>(
        `${endpoint}/quadro`
      );

  if (response.data) {
    const quadros = response.data as QuadroDeHorariosType[];
    const filmes: FilmeModel[] = serverApi
      ? await FilmesActions.getAll(await GetRootAPIServer())
      : await FilmesActions.getAll();

    if (filmes) {
      return quadros.map((sala) => ({
        nome: sala.nome,
        sessoes: sala.sessoes.map((sessao) => ({
          ...sessao,
          avaliacao:
            filmes.find((filme) => filme.id === sessao.idFilme)?.avaliacao || 0,
          sinope:
            filmes.find((filme) => filme.id === sessao.idFilme)?.sinopse || "",
        })),
      }));
    }
  }

  return [];
}

export const SalasActions = {
  getOne,
  getAll,
  create,
  edit,
  remove,
  getQuadroDeHorarios,
};
