"use client";

import { AlertCircle } from "lucide-react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

export default function CantViewAsRoot() {
  const router = useRouter();
  return (
    <div className="w-full flex flex-col items-center p-10">
      <span className="text-md flex gap-x-2 items-center text-center md:text-lg">
        <AlertCircle />A página não está disponível para esse tipo de cinema.
      </span>
      <Button variant={"link"} onClick={() => router.back()}>
        Voltar
      </Button>
    </div>
  );
}
