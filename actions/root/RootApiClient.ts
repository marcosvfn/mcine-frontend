import axios, { CreateAxiosDefaults } from "axios";
import { getSession } from "next-auth/react";

const baseURL = process.env.NEXT_APP_BASE_API_URL;

const rootOptions: CreateAxiosDefaults = {
  baseURL,
  headers: {
    tenantid: process.env.NEXT_APP_ROOT_TENANT_ID!,
  },
};

const GetRootAPIClient = () => {
  const instance = axios.create(rootOptions);
  instance.interceptors.request.use(async (request) => {
    const session = await getSession();

    if (session) {
      instance.interceptors.request.use((config) => {
        config.headers.authorization = `Bearer ${session?.backendTokens.accessToken}`;

        return config;
      });
    }
    return request;
  });

  instance.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (error.response && error.response.status === 401) {
        const session = await getSession();
        if (session) {
          error.config.headers.authorization = `Bearer ${session.backendTokens.accessToken}`;
          return instance(error.config);
        }
      }
      return Promise.reject(error);
    }
  );

  return instance;
};

export default GetRootAPIClient();
