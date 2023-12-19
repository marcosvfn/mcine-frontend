"use client";

import { cn } from "@/lib/utils";
import {
  Calendar,
  Clapperboard,
  LayoutDashboard,
  Popcorn,
  Projector,
  Store,
  Users,
} from "lucide-react";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { SheetClose } from "../ui/sheet";

export function MainNav({
  className,
  ...props
}: React.HtmlHTMLAttributes<HTMLElement>) {
  const pathname = usePathname();
  const params = useParams();
  const isRootCinema = params.idCinema === process.env.NEXT_APP_ROOT_TENANT_ID;

  const iconsClassnames = "w-5 h-5 transition duration-75 mr-2";

  const dashboardRoutes = [
    {
      href: `/${params.idCinema}`,
      label: "Dashboard",
      active: pathname === `/${params.idCinema}`,
      icon: <LayoutDashboard className={iconsClassnames} />,
    },
    {
      href: `/${params.idCinema}/usuarios`,
      label: "Usuários",
      active: pathname.includes(`/${params.idCinema}/usuarios`),
      icon: <Users className={iconsClassnames} />,
    },
    {
      href: `/${params.idCinema}/cinemas`,
      label: "Cinemas",
      active: pathname.includes(`/${params.idCinema}/cinemas`),
      icon: <Store className={iconsClassnames} />,
    },
    {
      href: `/${params.idCinema}/filmes`,
      label: "Filmes",
      active: pathname.includes(`/${params.idCinema}/filmes`),
      icon: <Clapperboard className={iconsClassnames} />,
    },
  ];

  const cinemaRoutes = [
    {
      href: `/${params.idCinema}`,
      label: "Dashboard",
      active: pathname === `/${params.idCinema}`,
      icon: <LayoutDashboard className={iconsClassnames} />,
    },
    {
      href: `/${params.idCinema}/salas`,
      label: "Salas",
      active: pathname.includes(`/${params.idCinema}/salas`),
      icon: <Projector className={iconsClassnames} />,
    },
    {
      href: `/${params.idCinema}/sessoes`,
      label: "Sessões",
      active: pathname.includes(`/${params.idCinema}/sessoes`),
      icon: <Popcorn className={iconsClassnames} />,
    },
    {
      href: `/${params.idCinema}/quadro`,
      label: "Quadro de Horários",
      active: pathname.includes(`/${params.idCinema}/quadro`),
      icon: <Calendar className={iconsClassnames} />,
    },
  ];

  return (
    <nav
      className={cn(
        "flex flex-col items-start space-y-4 lg:space-y-3",
        className
      )}
    >
      {isRootCinema
        ? dashboardRoutes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "flex text-sm items-center font-semibold p-2 hover:bg-muted group rounded-lg w-full py-2 transition-all duration-750 hover:scale-[1.01]",
                route.active && "bg-muted text-primary"
              )}
            >
              {route.icon}
              {route.label}
            </Link>
          ))
        : cinemaRoutes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "flex text-sm items-center font-semibold p-2 hover:bg-muted group rounded-lg w-full py-2 transition-all duration-750 hover:scale-[1.01]",
                route.active && "bg-muted text-primary"
              )}
            >
              {route.icon}
              {route.label}
            </Link>
          ))}
    </nav>
  );
}
