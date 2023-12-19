"use client";

import { LogInIcon, Ticket, User } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";

export default function UserInfoDropdownCine() {
  const router = useRouter();

  const iconsClassnames = "cursor-pointer w-4 h-4";
  const spanClassnames =
    "flex font-semibold items-center space-x-2 w-full justify-start cursor-pointer";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar className="hover:scale-110 transition-all duration-750 flex items-center justify-center rounded-full bg-muted">
          <User className="text-primary" />
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuGroup className="flex items-center justify-center">
          <div className="w-32 h-10 relative">
            <Image
              src={
                "https://res.cloudinary.com/dpmbuqjqj/image/upload/v1702862537/logo.mcine_mjupbm.svg"
              }
              alt="logo"
              fill
            />
          </div>
        </DropdownMenuGroup>
        <Separator className="dark:bg-zinc-700" />
        <DropdownMenuGroup>
          <DropdownMenuItem className="hover:bg-muted">
            <span
              className={spanClassnames}
              onClick={() => router.push("/home/login")}
            >
              <Ticket className={cn(iconsClassnames)} />
              <h5>Meus Tickets</h5>
            </span>
          </DropdownMenuItem>
          <DropdownMenuItem className="hover:bg-muted">
            <span
              className={spanClassnames}
              onClick={() => router.push("/landing")}
            >
              <LogInIcon className={cn(iconsClassnames)} />
              <h5>Painel Administrativo</h5>
            </span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
