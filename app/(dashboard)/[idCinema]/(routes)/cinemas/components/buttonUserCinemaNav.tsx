"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useParams } from "next/navigation";

interface ButtonUserCinemaNavProps {
  id: string;
}

export default function ButtonUserCinemaNav(props: ButtonUserCinemaNavProps) {
  const { id } = props;
  const params = useParams();

  return (
    <Link href={`/${params.idCinema}/cinemas/${id}`}>
      <h5 className="text-primary font-semibold text-sm hover:underline">
        Gerenciar Usuários
      </h5>
    </Link>
  );
}
