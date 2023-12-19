import { AxiosInstance } from "axios";
import { AssentoModel } from "../assentos/api";
import { SessaoModel } from "../sessoes/api";
import GetTenantApiClient from "../TenantApiClient";
import { HttpResponse, handleDeleteResponse } from "@/actions/protocols";

const endpoint = "/ticket";

export interface TicketModel {
  id: string;
  nomeReserva: string;
  cpfReserva: string;
  idAssento: string;
  createdAt: Date;
  updatedAt: Date;
}

type AssentosInfo = {
  id: string;
  numero: string;
};

type CustomTicketsInfo = {
  id: string;
  nomeReserva: string;
  cpfReserva: string;
  createdAt: string;
  assento: AssentosInfo;
};

export interface TicketInfoBySessaoReturn {
  Sesssao: SessaoModel;
  nomeFilme: string;
  nomeCinema: string;
  tickets: CustomTicketsInfo[];
  assentos: AssentoModel[];
}
export type TicketByCpfExtraInfo = {
  nomeFilme: string;
  assento: {
    numero: number;
  };
  sessao: {
    dtSessao: string;
    horaInicio: string;
    vlEntrada: number;
    idFilme: string;
    sala: {
      nome: string;
    };
  };
};

export type TicketByCpfReturn = (TicketModel & TicketByCpfExtraInfo)[];

async function getAll(
  serverApi?: AxiosInstance,
  tenantId?: string
): Promise<TicketModel[]> {
  const response = serverApi
    ? await serverApi.get(`${endpoint}/all`)
    : await GetTenantApiClient(tenantId!).get(`${endpoint}/all`);
  return response.data;
}

async function getOne(
  id: string,
  serverApi?: AxiosInstance,
  tenantId?: string
): Promise<TicketModel | null> {
  const response = serverApi
    ? await serverApi.get(`${endpoint}/${id}`)
    : await GetTenantApiClient(tenantId!).get(`${endpoint}/${id}`);
  if (response && response.data) {
    return response.data;
  }
  return null;
}

async function create(
  data: Partial<TicketModel>[],
  tenantId: string
): Promise<TicketModel> {
  const response = await GetTenantApiClient(tenantId).post<TicketModel>(
    `${endpoint}/new`,
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

async function getTicketsInfoBySessao(
  idSessao: string,
  serverApi?: AxiosInstance,
  tenantId?: string
): Promise<TicketInfoBySessaoReturn> {
  const response = serverApi
    ? await serverApi.get(`${endpoint}/sessao/${idSessao}`)
    : await GetTenantApiClient(tenantId!).get(`${endpoint}/sessao/${idSessao}`);
  return response.data;
}

async function getTicketsByCpf(
  cpf: string,
  serverApi?: AxiosInstance,
  tenantId?: string
): Promise<TicketByCpfReturn> {
  const response = serverApi
    ? await serverApi.get(`${endpoint}/cpf/${cpf}`)
    : await GetTenantApiClient(tenantId!).get(`${endpoint}/cpf/${cpf}`);
  return response.data;
}

export const TicketsActions = {
  getAll,
  getOne,
  create,
  remove,
  getTicketsInfoBySessao,
  getTicketsByCpf,
};
