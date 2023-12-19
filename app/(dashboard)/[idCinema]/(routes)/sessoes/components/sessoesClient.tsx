"use client";

import { Plus, Popcorn } from "lucide-react";
import { Button } from "../../../../../../components/ui/button";
import { useParams, useRouter } from "next/navigation";
import { SessoesColumns, columns } from "./columns";
import { Separator } from "@/components/ui/separator";
import Heading from "@/components/base/heading";
import { DataTable } from "@/components/tables/dataTable";

interface SessoesClientProps {
  data: SessoesColumns[];
}

export default function SessoesClient({ data }: SessoesClientProps) {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-3">
          <Popcorn size={40} />
          <Heading
            title={`Sessões (${data.length})`}
            description="Gerencie as sessões cadastradas no cinema"
          />
        </span>
        <Button onClick={() => router.push(`/${params.idCinema}/sessoes/new`)}>
          <Plus className="mr-0 md:mr-2 h-4 w-4" />
          <h5 className="hidden md:block">Adicionar Nova</h5>
        </Button>
      </div>
      <Separator className="dark:bg-zinc-700" />
      <DataTable searchKey={"nomeFilme"} columns={columns} data={data} />
    </>
  );
}
