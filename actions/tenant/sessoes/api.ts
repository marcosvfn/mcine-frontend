import { AxiosInstance } from "axios";
import { HttpResponse, handleDeleteResponse } from "../../protocols";
import GetTenantAPIClient from "../TenantApiClient";
import { SalaModel } from "../salas/api";
import {
  TotalArrecadadoAnoByCinema,
  UltimasVendas,
} from "@/actions/root/cinema/api";

const endpoint = `/sessao`;

export type SessaoModel = {
  id: string;
  idFilme: string;
  idCinema: string;
  idSala: string;
  horaInicio: string;
  dtSessao: Date;
  vlEntrada: number;
  createdAt: Date;
  updatedAt: Date;
};

export type SessaoInfoNomes = {
  nomeFilme: string;
  nomeCinema: string;
  sala: SalaModel;
};

export type SessaoCombinedType = SessaoModel & SessaoInfoNomes;

async function getAll(
  serverApi?: AxiosInstance,
  tenantId?: string
): Promise<SessaoCombinedType[]> {
  const response = serverApi
    ? await serverApi.get(`${endpoint}/all`)
    : await GetTenantAPIClient(tenantId!).get(`${endpoint}/all`);
  return response.data;
}

async function getOne(
  id: string,
  serverApi?: AxiosInstance,
  tenantId?: string
): Promise<SessaoCombinedType | null> {
  const response = serverApi
    ? await serverApi.get(`${endpoint}/${id}`)
    : await GetTenantAPIClient(tenantId!).get(`${endpoint}/${id}`);
  if (response && response.data) {
    return response.data;
  }
  return null;
}

async function create(
  data: Partial<SessaoModel & { agendarSemana: boolean }>,
  tenantId: string
): Promise<SessaoModel> {
  const response = await GetTenantAPIClient(tenantId).post<SessaoModel>(
    `${endpoint}/new`,
    data
  );
  return response.data;
}

async function edit(
  id: string,
  data: Partial<SessaoModel>,
  tenantId: string
): Promise<SessaoModel> {
  const response = await GetTenantAPIClient(tenantId).patch<SessaoModel>(
    `${endpoint}/${id}`,
    data
  );
  return response.data;
}

async function remove(id: string, tenantId: string): Promise<HttpResponse> {
  const response = await GetTenantAPIClient(tenantId).delete(
    `${endpoint}/${id}`
  );
  return handleDeleteResponse(response);
}

type TotalArrecadadoReturn = {
  [nomeFilme: string]: number;
};

async function getTotalArrecadadoByFilme(
  tenantId: string,
  serverApi?: AxiosInstance
): Promise<TotalArrecadadoReturn> {
  const response = serverApi
    ? await serverApi.get(`${endpoint}/total/filme`)
    : await GetTenantAPIClient(tenantId).get(`${endpoint}/total/filme`);
  return response.data;
}

type TotalArrecadadoSemanaReturn = {
  valor: number;
};

async function getTotalArrecadadoSemana(
  tenantId: string,
  serverApi?: AxiosInstance
): Promise<TotalArrecadadoSemanaReturn> {
  const response = serverApi
    ? await serverApi.get(`${endpoint}/total/semana`)
    : await GetTenantAPIClient(tenantId).get(`${endpoint}/total/semana`);
  return response.data;
}

export type VisualizacoesReturn = {
  [key: string]: number;
};

async function getVisualizacoesByFilme(
  tenantId: string,
  serverApi?: AxiosInstance
): Promise<VisualizacoesReturn> {
  const response = serverApi
    ? await serverApi.get(`${endpoint}/visualizacoes/all`)
    : await GetTenantAPIClient(tenantId).get(`${endpoint}/visualizacoes/all`);
  return response.data;
}

async function getVisualizacoesByFilmeSemana(
  tenantId: string,
  serverApi?: AxiosInstance
): Promise<VisualizacoesReturn> {
  const response = serverApi
    ? await serverApi.get(`${endpoint}/visualizacoes/semana`)
    : await GetTenantAPIClient(tenantId).get(
        `${endpoint}/visualizacoes/semana`
      );
  return response.data;
}

async function getUltimasVendasByCinema(
  tenantId: string,
  serverApi?: AxiosInstance
): Promise<UltimasVendas[]> {
  const response = serverApi
    ? await serverApi.get(`${endpoint}/vendas`)
    : await GetTenantAPIClient(tenantId).get(`${endpoint}/vendas`);
  return response.data;
}

async function getFaturamentoAnual(
  tenantId: string,
  serverApi?: AxiosInstance
): Promise<TotalArrecadadoAnoByCinema> {
  const response = serverApi
    ? await serverApi.get(`${endpoint}/faturamento`)
    : await GetTenantAPIClient(tenantId).get(`${endpoint}/faturamento`);
  return response.data;
}

type CombinedSessaoModel = {
  nomeFilme: string;
  avaliacao: number;
  capaUrl: string;
};

export type SessaoByFilme = {
  data: string;
  sessoes: (SessaoModel & CombinedSessaoModel)[];
};
export type SessoesByFilme = {
  SessoesPassadas: SessaoByFilme[];
  SessoesFuturas: SessaoByFilme[];
};

async function getSessoesByFilme(
  idFilme: string,
  tenantId: string,
  serverApi?: AxiosInstance
): Promise<SessoesByFilme> {
  const response = serverApi
    ? await serverApi.get(`${endpoint}/filme/${idFilme}`)
    : await GetTenantAPIClient(tenantId).get(`${endpoint}/filme/${idFilme}`);
  return response.data;
}

export const SessoesActions = {
  getOne,
  getAll,
  create,
  edit,
  remove,
  getTotalArrecadadoByFilme,
  getTotalArrecadadoSemana,
  getVisualizacoesByFilme,
  getVisualizacoesByFilmeSemana,
  getUltimasVendasByCinema,
  getFaturamentoAnual,
  getSessoesByFilme,
};
