"use client";

import { Plus, Store, Users } from "lucide-react";
import { Button } from "../../../../../../components/ui/button";
import { useParams, useRouter } from "next/navigation";
import { UsuarioColumns, columns } from "./columns";
import { Separator } from "@/components/ui/separator";
import Heading from "@/components/base/heading";
import { DataTable } from "@/components/tables/dataTable";

interface UsuarioClientProps {
  data: UsuarioColumns[];
}

export default function UsuarioClient({ data }: UsuarioClientProps) {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className="flex sm:items-center sm:justify-between sm:flex-row sm:gap-0 flex-col gap-3 items-start justify-start">
        <span className="flex items-center gap-x-3">
          <Users size={40} />
          <Heading
            title={`Usuários (${data.length})`}
            description="Gerencie os usuários cadastrados no sistema"
          />
        </span>
      </div>
      <Separator className="dark:bg-zinc-700" />
      <DataTable searchKey={"nome"} columns={columns} data={data}>
        <span className="flex md:flex-row flex-col gap-3 md:w-auto w-full">
          <Button
            onClick={() => router.push(`/${params.idCinema}/cinemas`)}
            className="w-full sm:w-auto"
          >
            <Store className="mr-2 h-4 w-4" />
            <h5 className="text-sm md:text-md">Vincular com cinemas</h5>
          </Button>
          <Button
            onClick={() => router.push(`/${params.idCinema}/usuarios/new`)}
            className="w-full sm:w-auto"
          >
            <Plus className="mr-0 md:mr-2 h-4 w-4" />
            Adicionar Novo
          </Button>
        </span>
      </DataTable>
    </>
  );
}
