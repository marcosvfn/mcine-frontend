"use client";

import { AlertCircle } from "lucide-react";
import { Button } from "../ui/button";
import { useParams, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

export default function NoData({ text }: { text?: string }) {
  const router = useRouter();
  const params = useParams();

  const isCinema = !params.idCinema;
  return (
    <div className="w-full flex flex-col items-center p-10">
      <span className="text-md md:text-lg flex gap-x-2 items-center">
        <AlertCircle />
        {text || "Não existem dados cadastrados."}
      </span>
      <Button
        variant={"link"}
        onClick={() => router.back()}
        className={cn("block", isCinema && "hidden")}
      >
        Voltar
      </Button>
    </div>
  );
}
