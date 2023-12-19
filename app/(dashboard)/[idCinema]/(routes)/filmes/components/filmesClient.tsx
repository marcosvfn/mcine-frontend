"use client";

import { Clapperboard, Plus } from "lucide-react";
import { Button } from "../../../../../../components/ui/button";
import { useParams, useRouter } from "next/navigation";
import { FilmesColumns, columns } from "./columns";
import { Separator } from "@/components/ui/separator";
import Heading from "@/components/base/heading";
import { DataTable } from "@/components/tables/dataTable";

interface FilmesClientProps {
  data: FilmesColumns[];
}

export default function FilmesClient({ data }: FilmesClientProps) {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-3">
          <Clapperboard size={40} />
          <Heading
            title={`Filmes (${data.length})`}
            description="Gerencie os filmes cadastrados no sistema"
          />
        </span>
        <Button onClick={() => router.push(`/${params.idCinema}/filmes/new`)}>
          <Plus className="mr-0 md:mr-2 h-4 w-4" />
          <h5 className="hidden sm:block">Adicionar Novo</h5>
        </Button>
      </div>
      <Separator className="dark:bg-zinc-700" />
      <DataTable searchKey={"nome"} columns={columns} data={data} />
    </>
  );
}
