"use client";

import {
  Calendar,
  Clapperboard,
  LayoutDashboard,
  Menu,
  Popcorn,
  Projector,
  Store,
  Users,
} from "lucide-react";
import IconButton from "./iconButton";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "../ui/sheet";
import CinemaSwitcher, { UserCinemaModel } from "./cinemaSwitcher";
import { Separator } from "../ui/separator";
import { useParams, usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";

interface MobileMenuProps {
  userCinemas: UserCinemaModel[];
}

export default function MobileMenu(props: MobileMenuProps) {
  const { userCinemas } = props;
  const params = useParams();
  const pathname = usePathname();

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
    <div className="block lg:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <IconButton
            icon={<Menu className="text-primary" />}
            className="bg-card"
          />
        </SheetTrigger>
        <SheetContent side="left" className="max-w-screen">
          <div className="h-full px-3 py-5 overflow-y-auto justify-center">
            <span className="text-3xl font-semibold text-primary flex items-center justify-center mb-5">
              <Popcorn size={60} />
            </span>

            <Link href="/home">
              <div className="w-36 h-16 relative mx-auto">
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
            <nav
              className={cn("flex flex-col items-start space-y-4 lg:space-y-6")}
            >
              {isRootCinema
                ? dashboardRoutes.map((route) => (
                    <SheetClose key={route.href} asChild>
                      <Link
                        href={route.href}
                        className={cn(
                          "flex text-sm items-center font-semibold p-2 hover:bg-muted group rounded-lg w-full py-2 transition-all duration-750 hover:scale-[1.01]",
                          route.active && "bg-muted text-primary"
                        )}
                      >
                        {route.icon}
                        {route.label}
                      </Link>
                    </SheetClose>
                  ))
                : cinemaRoutes.map((route) => (
                    <SheetClose key={route.href} asChild>
                      <Link
                        key={route.href}
                        href={route.href}
                        className={cn(
                          "flex text-sm items-center font-semibold p-2 hover:bg-muted group rounded-lg w-full py-2 transition-all duration-750",
                          route.active && "bg-muted text-primary"
                        )}
                      >
                        {route.icon}
                        {route.label}
                      </Link>
                    </SheetClose>
                  ))}
            </nav>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
