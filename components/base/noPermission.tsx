"use client";

import { AlertCircle } from "lucide-react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

export default function NoPermission() {
  const router = useRouter();
  return (
    <div className="w-full flex flex-col items-center p-10">
      <span className="text-md md:text-lg flex gap-x-2 items-center">
        <AlertCircle />
        Usuário sem permissão para operar as funcionalidades dessa página.
      </span>
      <Button variant={"link"} onClick={() => router.back()}>
        Voltar
      </Button>
    </div>
  );
}
