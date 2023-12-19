import GetRootAPIServer from "@/actions/root/RootApiServer";
import { UsuarioActions } from "@/actions/root/usuario/api";
import { authOptions } from "@/lib/authOptions";
import Navbar from "@/components/base/navbar";
import { Info } from "lucide-react";
import { getServerSession } from "next-auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export default async function DashboardLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { storeId: string };
}) {
  const session = await getServerSession(authOptions);

  const userId = session?.user?.id;

  if (!userId) {
    redirect("/home");
  }

  const serverApi = await GetRootAPIServer();

  const userCinemas = await UsuarioActions.getCinemasByUserEmail(
    session.user.email,
    serverApi
  );

  const hasRootTenant = userCinemas?.find(
    (item) => item.id === process.env.NEXT_APP_ROOT_TENANT_ID
  );

  if (hasRootTenant) {
    redirect(`/${hasRootTenant.id}`);
  }

  if (userCinemas?.length) {
    redirect(`/${userCinemas[0].id}`);
  } else {
    return (
      <>
        <Navbar nomeCinema={""} />
        <span className="p-5 flex gap-x-2 items-center justify-center">
          <Info />
          Usuário não está vinculado a nenhum cinema. Entre em contato com o
          administrador para configurar.
        </span>
      </>
    );
  }
}
