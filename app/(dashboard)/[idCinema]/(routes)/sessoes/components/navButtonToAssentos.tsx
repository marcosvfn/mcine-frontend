"use client";

import { SessoesColumns } from "./columns";
import { useParams, useRouter } from "next/navigation";

interface NavButtonToTicketsProps {
  data: SessoesColumns;
}

export default function NavButtonToTickets(props: NavButtonToTicketsProps) {
  const { data } = props;
  const router = useRouter();
  const params = useParams();
  return (
    <h5
      className="text-primary hover:underline font-semibold cursor-pointer"
      onClick={() =>
        router.push(`/${params.idCinema}/sessoes/${data.id}/tickets`)
      }
    >
      Gerenciar Tickets
    </h5>
  );
}
