import AdminDashBoard from "@/components/dashboards/adminDashBoard";
import TenantDashBoard from "@/components/dashboards/tenantDashBoard";
import { authOptions } from "@/lib/authOptions";
import { getIsRootTenant } from "@/lib/utils";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

interface RootPageProps {
  params: {
    idCinema: string;
  };
}

export default async function RootPage({ params }: RootPageProps) {
  const session = await getServerSession(authOptions);
  const userId = session?.user.id;

  if (!userId) {
    redirect("/landing");
  }

  const isRootTenant = getIsRootTenant(params.idCinema);

  if (!isRootTenant) return <TenantDashBoard idCinema={params.idCinema} />;

  return <AdminDashBoard idCinema={params.idCinema} />;
}
