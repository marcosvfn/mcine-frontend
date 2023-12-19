import { AxiosError, AxiosInstance } from "axios";
import {
  HttpResponse,
  handleDeleteResponse,
  handleError,
} from "../../protocols";
import { UserCinemaModel } from "@/components/base/cinemaSwitcher";
import GetRootAPIClient from "../RootApiClient";

const endpoint = `/usuario`;

export type UsuarioModel = {
  id: number;
  nome: string;
  email: string;
  senha: string;
  createdAt: Date;
  updatedAt: Date;
};

async function getAll(serverApi?: AxiosInstance): Promise<UsuarioModel[]> {
  const response = serverApi
    ? await serverApi.get(`${endpoint}/all`)
    : await GetRootAPIClient.get(`${endpoint}/all`);
  return response.data;
}

async function getOne(
  id: string,
  serverApi?: AxiosInstance
): Promise<UsuarioModel> {
  const response = serverApi
    ? await serverApi.get(`${endpoint}/${id}`)
    : await GetRootAPIClient.get(`${endpoint}/${id}`);
  return response.data;
}

async function create(data: Partial<UsuarioModel>): Promise<UsuarioModel> {
  const response = await GetRootAPIClient.post<UsuarioModel>(
    `${endpoint}/new`,
    data
  );
  return response.data;
}

async function edit(
  id: string,
  data: Partial<UsuarioModel>
): Promise<UsuarioModel> {
  const response = await GetRootAPIClient.patch<UsuarioModel>(
    `${endpoint}/${id}`,
    data
  );
  return response.data;
}

async function remove(id: string): Promise<HttpResponse> {
  if (id === "1")
    return {
      success: false,
      message: "Esse usuário não pode ser excluído",
    };
  const response = await GetRootAPIClient.delete(`${endpoint}/${id}`);
  return handleDeleteResponse(response);
}

async function getCinemasByUserEmail(
  email: string,
  serverApi?: AxiosInstance
): Promise<UserCinemaModel[] | undefined> {
  try {
    const response = serverApi
      ? await serverApi.post(`${endpoint}/cinemas`, { email })
      : await GetRootAPIClient.post(`${endpoint}/cinemas`, { email });
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    console.log(axiosError.response?.data);
  }
}

export const UsuarioActions = {
  getOne,
  getAll,
  create,
  edit,
  remove,
  getCinemasByUserEmail,
};
