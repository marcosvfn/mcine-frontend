import { authOptions } from "@/lib/authOptions";
import axios, { CreateAxiosDefaults } from "axios";
import { getServerSession } from "next-auth";

const baseURL = process.env.NEXT_APP_BASE_API_URL;

const rootOptions: CreateAxiosDefaults = {
  baseURL,
};

export default async function GetTenantAPIServer(tenantId: string) {
  const ApiClient = axios.create(rootOptions);

  const session = await getServerSession(authOptions);

  const token = session?.backendTokens.accessToken;

  ApiClient.interceptors.request.use((config) => {
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    config.headers.tenantid = tenantId;
    return config;
  });

  return ApiClient;
}
