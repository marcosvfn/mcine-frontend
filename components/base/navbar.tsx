import GetRootAPIServer from "@/actions/root/RootApiServer";
import { UsuarioActions } from "@/actions/root/usuario/api";
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import ThemeSwitcher from "./themeSwitcher";
import UserInfo from "./userInfo";
import { Clapperboard } from "lucide-react";
import MobileMenu from "./menuMobile";

export default async function Navbar({ nomeCinema }: { nomeCinema: string }) {
  const session = await getServerSession(authOptions);

  const userId = session?.user.id;

  if (!userId) {
    redirect("/landing");
  }

  const serverApi = await GetRootAPIServer();

  const userCinemas = await UsuarioActions.getCinemasByUserEmail(
    session.user.email,
    serverApi
  );

  return (
    <>
      <div className="bg-card dark:bg-muted">
        <div className="flex h-16 items-center px-4 w-full ">
          <MobileMenu userCinemas={userCinemas || []} />
          <Clapperboard className="ml-4 mr-2 text-primary hidden lg:block" />
          <h5 className="font-semibold text-xl font-sans text-primary hidden lg:block">
            {nomeCinema}
          </h5>
          <div className="ml-auto flex items-center space-x-4">
            <ThemeSwitcher />
            <UserInfo />
          </div>
        </div>
      </div>
    </>
  );
}
