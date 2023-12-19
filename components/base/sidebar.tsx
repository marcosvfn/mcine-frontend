import GetRootAPIServer from "@/actions/root/RootApiServer";
import { UsuarioActions } from "@/actions/root/usuario/api";
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { Separator } from "../ui/separator";
import CinemaSwitcher from "./cinemaSwitcher";
import { Popcorn } from "lucide-react";
import { MainNav } from "./mainNav";
import Link from "next/link";
import Image from "next/image";

export default async function SiderBar() {
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
    <aside
      className="hidden lg:block fixed bottom-0 top-0 left-0 z-40 w-64 h-screen shadow-lg shadow-zinc-500 dark:shadow-zinc-950 transition-transform -translate-x-full sm:translate-x-0"
      aria-label="Sidebar"
    >
      <div className="h-full px-3 py-5 overflow-y-auto justify-center gap-3">
        <span className="text-3xl font-semibold text-primary flex items-center justify-center">
          <Popcorn size={35} />
        </span>

        <Link href="/">
          <div className="w-36 h-14 relative mx-auto">
            <Image
              src={
                "https://res.cloudinary.com/dpmbuqjqj/image/upload/v1702862537/logo.mcine_mjupbm.svg"
              }
              alt="logo"
              fill
            />
          </div>
        </Link>
        <CinemaSwitcher items={userCinemas || []} />
        <Separator className="my-5" />
        <MainNav />
      </div>
    </aside>
  );
}
