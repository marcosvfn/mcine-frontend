/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { DataTable } from "@/components/tables/dataTable";
import { UserTicketsColumns } from "../../[idCinema]/[idSessao]/components/columns";
import { columns } from "../../[idCinema]/[idSessao]/components/columns";

interface NewTicketClientCinemaProps {
  existingTickets: UserTicketsColumns[] | null;
}

export default function ViewTicketClient(props: NewTicketClientCinemaProps) {
  const { existingTickets } = props;

  return (
    <>
      <div className="w-full bg-card flex items-center gap-y-6 justify-center flex-col">
        {existingTickets && existingTickets.length > 0 && (
          <div className="w-full items-start justify-start mt-5 bg-card p-8">
            <h5 className="tracking-tight font-bold text-xl">
              Histórico de Tickets
            </h5>
            <DataTable
              columns={columns}
              data={existingTickets || []}
              searchKey={""}
            />
          </div>
        )}
      </div>
    </>
  );
}
