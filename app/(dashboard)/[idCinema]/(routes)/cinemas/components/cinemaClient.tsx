"use client";

import { Plus, Store } from "lucide-react";
import { Button } from "../../../../../../components/ui/button";
import { useParams, useRouter } from "next/navigation";
import { CinemaColumns, columns } from "./columns";
import { Separator } from "@/components/ui/separator";
import Heading from "@/components/base/heading";
import { DataTable } from "@/components/tables/dataTable";

interface CinemaClientProps {
  data: CinemaColumns[];
}

export default function CinemaClient({ data }: CinemaClientProps) {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-3">
          <Store size={40} />
          <Heading
            title={`Cinemas (${data.length})`}
            description="Gerencie os cinemas cadastrados no sistema"
          />
        </span>
        <Button onClick={() => router.push(`/${params.idCinema}/cinemas/new`)}>
          <Plus className="mr-0 sm:mr-2 h-4 w-4" />
          <h5 className="hidden sm:block">
            <h5 className="hidden sm:block">Adicionar Novo</h5>
          </h5>
        </Button>
      </div>
      <Separator className="dark:bg-zinc-700" />
      <DataTable searchKey={"nome"} columns={columns} data={data} />
    </>
  );
}
