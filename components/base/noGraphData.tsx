"use client";

import { AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";

export default function NoGraphData({ text }: { text?: string }) {
  const router = useRouter();
  return (
    <div className="w-full flex flex-col items-center p-10">
      <span className="text-md md:text-lg font-semibold text-muted-foreground tracking-tight text-center flex gap-x-2 justify-center items-center">
        <AlertCircle className="text-primary" size={30} />
        {text || "Não há dados para ser mostrado."}
      </span>
    </div>
  );
}
