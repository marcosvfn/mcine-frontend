"use client";

import { Home, LogOutIcon, User } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarImage } from "../ui/avatar";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function UserInfoDropdown() {
  const router = useRouter();

  const iconsClassnames = "cursor-pointer w-4 h-4";
  const spanClassnames =
    "flex font-semibold items-center space-x-2 w-full justify-start cursor-pointer";

  const sessionInfo = useSession();

  const formattedUserName = sessionInfo.data?.user.nome.split(" ").join("+");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar className="hover:scale-110 transition-all duration-750">
          <AvatarImage
            src={`https://ui-avatars.com/api/?background=9D1D2C&color=fff&font-size=0.38&name=${formattedUserName}`}
            alt="@shadcn"
          />
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel className="w-full text-start flex gap-2">
          <User size={20} />
          {sessionInfo.data?.user.nome}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <span
              className={spanClassnames}
              onClick={() => router.push("/home")}
            >
              <Home className={cn(iconsClassnames, "text-muted-foreground")} />
              <h5 className="text-muted-foreground">Voltar ao site</h5>
            </span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <span className={spanClassnames} onClick={() => signOut()}>
              <LogOutIcon className={cn(iconsClassnames, "text-destructive")} />
              <h5 className="text-destructive">Sair</h5>
            </span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
