import { AxiosResponse } from "axios";
import toast from "react-hot-toast";

export type HttpResponse = {
  success: boolean;
  message: string;
};

export function handleDeleteResponse(response: AxiosResponse): HttpResponse {
  if (response.status === 200) {
    return {
      success: true,
      message: "Registro excluído.",
    };
  }
  return {
    success: false,
    message: response.data.message,
  };
}

type NestJSError = {
  response: {
    data: {
      message: string;
      statusCode: number;
    };
  };
};

export function handleError(error: unknown) {
  const localError = error as NestJSError;

  toast.error(localError.response.data.message);
}
