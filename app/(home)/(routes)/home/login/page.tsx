import GetRootAPIServer from "@/actions/root/RootApiServer";
import { CinemaActions } from "@/actions/root/cinema/api";
import LoginCinemaForm from "./components/loginForm";

export default async function LoginTicketPage() {
  const apiServer = await GetRootAPIServer();

  const allCinemas = await CinemaActions.getAll(apiServer);

  return (
    <div className="flex-col w-full">
      <div className="flex-1 space-y-4 w-full">
        <LoginCinemaForm data={allCinemas} />
      </div>
    </div>
  );
}
