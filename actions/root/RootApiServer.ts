import { authOptions } from "@/lib/authOptions";
import axios, { CreateAxiosDefaults } from "axios";
import { getServerSession } from "next-auth";
import { cookies } from "next/headers";

const baseURL = process.env.NEXT_APP_BASE_API_URL;

const rootOptions: CreateAxiosDefaults = {
  baseURL,
  headers: {
    tenantid: process.env.NEXT_APP_ROOT_TENANT_ID!,
  },
};

export const rootApiServer = axios.create(rootOptions);

export default async function GetRootAPIServer() {
  const ApiClient = axios.create(rootOptions);

  const session = await getServerSession(authOptions);

  const token = session?.backendTokens.accessToken;

  ApiClient.interceptors.request.use((config) => {
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  });

  return ApiClient;
}
