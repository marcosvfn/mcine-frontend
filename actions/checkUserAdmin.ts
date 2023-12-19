"use server";

import GetRootAPIServer from "./root/RootApiServer";
import { CinemaActions } from "./root/cinema/api";

export async function CheckUserAdmin(userId: number, tenantId: string) {
  const userCinemas = await CinemaActions.getUsuariosByIdCinema(
    tenantId,
    await GetRootAPIServer()
  );

  return userCinemas.find((user) => user.idUsuario === userId)?.isAdmin;
}
