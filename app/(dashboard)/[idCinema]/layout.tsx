import GetRootAPIServer from "@/actions/root/RootApiServer";
import { UsuarioActions } from "@/actions/root/usuario/api";
import Footer from "@/components/base/footer";
import Navbar from "@/components/base/navbar";
import NoPermission from "@/components/base/noPermission";
import SiderBar from "@/components/base/sidebar";
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export default async function DashboardLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { idCinema: string };
}) {
  const session = await getServerSession(authOptions);

  const userId = session?.user?.nome;

  if (!userId) {
    redirect("/landing");
  }

  const serverApi = await GetRootAPIServer();

  const userCinemas = await UsuarioActions.getCinemasByUserEmail(
    String(session?.user.email),
    serverApi
  );

  if (!userCinemas) {
    redirect("/");
  }

  const idsCinemasUser = userCinemas?.map((cinema) => cinema.id);
  const userCanViewCinemaInfo = idsCinemasUser?.includes(params.idCinema);
  const currentCinemaName =
    userCinemas.find((cinema) => cinema.id === params.idCinema)?.nome ?? "";

  return (
    <main className="flex">
      <SiderBar />
      <section className="flex-1 bg-muted min-h-screen w-screen ml-0 lg:ml-64 scroll-smooth">
        <Navbar nomeCinema={currentCinemaName} />
        <div className="w-full">
          {userCanViewCinemaInfo ? children : <NoPermission />}
        </div>
        <Footer />
      </section>
    </main>
  );
}
