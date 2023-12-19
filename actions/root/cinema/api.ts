import { AxiosInstance } from "axios";
import {
  HttpResponse,
  handleDeleteResponse,
  handleError,
} from "../../protocols";
import GetRootAPIClient from "../RootApiClient";
import { UsuarioModel } from "../usuario/api";

const endpoint = `/cinema`;

export type CinemaModel = {
  id: string;
  nome: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export interface UsuarioCinemaModel {
  id: number;
  isAdmin: boolean;
  idUsuario: number;
  idCinema: string;
  cinema: CinemaModel;
  user: Partial<UsuarioModel>;
}

type UsuariosCinemaEditRequest = {
  isAdmin: boolean;
  idUsuario: number;
};

export interface EditCinema {
  nome: string;
  usuariosCinema: UsuariosCinemaEditRequest[];
}

export interface UltimasVendas {
  nomereserva: string;
  nomecinema: string;
  valor: number;
  datareserva: string;
}
async function getAll(serverApi?: AxiosInstance): Promise<CinemaModel[]> {
  const response = serverApi
    ? await serverApi.get(`${endpoint}/all`)
    : await GetRootAPIClient.get(`${endpoint}/all`);
  return response.data;
}

async function getOne(
  id: string,
  serverApi?: AxiosInstance
): Promise<CinemaModel> {
  const response = serverApi
    ? await serverApi.get(`${endpoint}/${id}`)
    : await GetRootAPIClient.get(`${endpoint}/${id}`);
  return response.data;
}

async function create(data: EditCinema): Promise<CinemaModel | undefined> {
  try {
    const response = await GetRootAPIClient.post<CinemaModel>(
      `${endpoint}/new`,
      data
    );
    return response.data;
  } catch (error) {
    handleError(error);
  }
}

async function edit(
  id: string,
  data: EditCinema
): Promise<CinemaModel | undefined> {
  try {
    const response = await GetRootAPIClient.patch<CinemaModel>(
      `${endpoint}/${id}`,
      data
    );
    return response.data;
  } catch (error) {
    handleError(error);
  }
}

async function remove(id: string): Promise<HttpResponse> {
  if (id === process.env.NEXT_APP_ROOT_TENANT_ID!)
    return {
      success: false,
      message: "Esse cinema não pode ser excluído!",
    };
  const response = await GetRootAPIClient.delete(`${endpoint}/${id}`);
  return handleDeleteResponse(response);
}

async function getUsuariosByIdCinema(
  id: string,
  serverApi?: AxiosInstance
): Promise<UsuarioCinemaModel[]> {
  const response = serverApi
    ? await serverApi.get(`${endpoint}/usuarios/${id}`)
    : await GetRootAPIClient.get(`${endpoint}/usuarios/${id}`);
  return response.data;
}

export type TotalArrecadadoSemana = {
  cinemanome: string;
  totalarrecadado: number;
};
async function getTotalArrecadadoSemana(
  serverApi?: AxiosInstance
): Promise<TotalArrecadadoSemana[]> {
  const response = serverApi
    ? await serverApi.get(`${endpoint}/total`)
    : await GetRootAPIClient.get(`${endpoint}/total`);
  return response.data;
}

export type TotalArrecadadoAnoByCinema = {
  id: string;
  data: {
    x: string;
    y: number;
    color: string;
  }[];
};

async function getTotalArrecadadoAnoByCinema(
  serverApi?: AxiosInstance
): Promise<TotalArrecadadoAnoByCinema[]> {
  const response = serverApi
    ? await serverApi.get(`${endpoint}/faturamento`)
    : await GetRootAPIClient.get(`${endpoint}/faturamento`);

  return response.data;
}

async function getUltimasVendas(
  serverApi?: AxiosInstance
): Promise<UltimasVendas[]> {
  const response = serverApi
    ? await serverApi.get(`${endpoint}/vendas`)
    : await GetRootAPIClient.get(`${endpoint}/vendas`);

  return response.data;
}

export const CinemaActions = {
  getOne,
  getAll,
  create,
  edit,
  remove,
  getUsuariosByIdCinema,
  getTotalArrecadadoSemana,
  getTotalArrecadadoAnoByCinema,
  getUltimasVendas,
};
