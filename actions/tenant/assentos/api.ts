import { AxiosInstance } from "axios";
import GetTenantApiClient from "../TenantApiClient";
import { HttpResponse, handleDeleteResponse } from "@/actions/protocols";
import { SessaoModel } from "../sessoes/api";

const endpoint = "assento";

export type AssentoModel = {
  id: string;
  numero: number;
  idSessao: string;
  reservado: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export interface AssentosDisponiveisReturn {
  sessao: SessaoModel & { nomeFilme: string };
  assentos: AssentoModel[];
}

async function getAll(
  serverApi?: AxiosInstance,
  tenantId?: string
): Promise<AssentoModel[]> {
  const response = serverApi
    ? await serverApi.get(`${endpoint}/all`)
    : await GetTenantApiClient(tenantId!).get(`${endpoint}/all`);
  return response.data;
}

async function getOne(
  id: string,
  serverApi?: AxiosInstance,
  tenantId?: string
): Promise<AssentoModel | null> {
  const response = serverApi
    ? await serverApi.get(`${endpoint}/${id}`)
    : await GetTenantApiClient(tenantId!).get(`${endpoint}/${id}`);
  if (response && response.data) {
    return response.data;
  }
  return null;
}

async function create(
  data: Partial<AssentoModel>,
  tenantId: string
): Promise<AssentoModel> {
  const response = await GetTenantApiClient(tenantId).post<AssentoModel>(
    `${endpoint}/new`,
    data
  );
  return response.data;
}

async function edit(
  id: string,
  data: Partial<AssentoModel>,
  tenantId: string
): Promise<AssentoModel> {
  const response = await GetTenantApiClient(tenantId).patch<AssentoModel>(
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

async function getAssentosDisponiveis(
  idSessao: string,
  serverApi?: AxiosInstance,
  tenantId?: string
): Promise<AssentosDisponiveisReturn | null> {
  const response = serverApi
    ? await serverApi.get(`${endpoint}/disponiveis/${idSessao}`)
    : await GetTenantApiClient(tenantId!).get(
        `${endpoint}/disponiveis/${idSessao}`
      );
  if (response && response.data) {
    return response.data;
  }
  return null;
}

export const AssentoActions = {
  getOne,
  getAll,
  create,
  edit,
  remove,
  getAssentosDisponiveis,
};
