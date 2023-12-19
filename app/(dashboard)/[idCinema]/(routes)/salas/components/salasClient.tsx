"use client";

import { Calendar, Plus, Projector } from "lucide-react";
import { Button } from "../../../../../../components/ui/button";
import { useParams, useRouter } from "next/navigation";
import { SalasColumns, columns } from "./columns";
import { Separator } from "@/components/ui/separator";
import Heading from "@/components/base/heading";
import { DataTable } from "@/components/tables/dataTable";
import Link from "next/link";

interface SalasClientProps {
  data: SalasColumns[];
}

export default function SalasClient({ data }: SalasClientProps) {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-3">
          <Projector size={40} />
          <Heading
            title={`Salas (${data.length})`}
            description="Gerencie as salas cadastradas no cinema"
          />
        </span>
        <Button onClick={() => router.push(`/${params.idCinema}/salas/new`)}>
          <Plus className="mr-0 md:mr-2 h-4 w-4" />
          <h5 className="hidden md:block">Adicionar Nova</h5>
        </Button>
      </div>
      <Separator className="dark:bg-zinc-600" />
      <DataTable searchKey={"nome"} columns={columns} data={data}>
        <Link href={`/${params.idCinema}/quadro`}>
          <Button className="ml-auto flex gap-x-2">
            <Calendar />
            Quadro de horários
          </Button>
        </Link>
      </DataTable>
    </>
  );
}
