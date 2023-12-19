import { AxiosInstance } from "axios";
import GetTenantApiClient from "../TenantApiClient";

const endpoint = "/avaliacao";

export type AvaliacaoModel = {
  id: string;
  idFilme: string;
  valor: number;
  createdAt: Date;
  updatedAt: Date;
};

async function getAvaliacaoByFilme(
  idFilme: string,
  apiServer?: AxiosInstance,
  tenantId?: string
) {
  const response = apiServer
    ? await apiServer.get(`${endpoint}/${idFilme}`)
    : await GetTenantApiClient(tenantId!).get(`${endpoint}/${idFilme}`);
  return response.data.nota;
}

async function createAvaliacao(
  data: Partial<AvaliacaoModel>,
  tenantId: string
) {
  const response = await GetTenantApiClient(tenantId!).post(
    `${endpoint}/new`,
    data
  );
  return response.data;
}

export const AvaliacoesActions = {
  getAvaliacaoByFilme,
  createAvaliacao,
};
