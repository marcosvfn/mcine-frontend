"use client";

import IconButton from "@/components/base/iconButton";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { Separator } from "@radix-ui/react-separator";
import { Home, LogInIcon, Menu, Popcorn, Ticket } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

export default function MenuCine() {
  const pathname = usePathname();

  const iconsClassnames = "w-5 h-5 transition duration-75 mr-2";

  const routes = [
    {
      href: `/home`,
      label: "Início",
      active: pathname === `/home`,
      icon: <Home className={iconsClassnames} />,
    },
    {
      href: `/home/login`,
      label: "Meus Ingressos",
      active: pathname.includes(`/home/login`),
      icon: <Ticket className={iconsClassnames} />,
    },
    {
      href: `/landing`,
      label: "Painel Administrativo",
      active: false,
      icon: <LogInIcon className={iconsClassnames} />,
    },
  ];
  return (
    <div className="block">
      <Sheet>
        <SheetTrigger asChild>
          <IconButton
            icon={<Menu className="text-primary" />}
            className="bg-muted"
          />
        </SheetTrigger>
        <SheetContent side="left" className="max-w-screen">
          <div className="h-full px-3 py-5 overflow-y-auto">
            <span className="text-3xl font-semibold text-primary flex items-center justify-center mb-1">
              <Popcorn size={45} />
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
            <Separator className="my-5" />
            <nav
              className={cn("flex flex-col items-start space-y-4 lg:space-y-6")}
            >
              {routes.map((route) => (
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
              ))}
            </nav>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
