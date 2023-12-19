"use client";

import { SessoesFilmesInfo } from "@/actions/tenant/salas/api";
import Image from "next/image";
import Currency from "./currency";
import Rating from "./rating";
import { Armchair, Calendar, Edit, Plus, Ticket, Timer } from "lucide-react";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { useParams, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useAssentoModal } from "@/app/hooks/useAssentosModal";
import { AssentoActions } from "@/actions/tenant/assentos/api";
import { useCreateTicket } from "@/app/hooks/useCreateTicket";
import { useState } from "react";
import LoadingButton from "../custom/LoadingButton";

interface FilmeCardProps {
  data: SessoesFilmesInfo;
  idSessao: string;
  isSessao?: boolean;
}

export default function FilmeSessaoCard(props: FilmeCardProps) {
  const { data, idSessao, isSessao } = props;

  const router = useRouter();
  const params = useParams();

  const isCinema = !params.idCinema;
  const assentosModal = useAssentoModal();
  const createTicket = useCreateTicket();

  const [loading, setLoading] = useState(false);

  const getAssentosData = async () => {
    const response = await AssentoActions.getAssentosDisponiveis(
      data.idSessao,
      undefined,
      data.idCinema
    );

    if (response) {
      return response;
    }
  };

  return (
    <div
      className={cn(
        "rounded-xl bg-card shadow-lg p-3 h-auto w-full flex flex-col sm:flex-row",
        isSessao && "bg-muted"
      )}
    >
      <div className="flex">
        <span className="flex flex-col items-center gap-2">
          <Calendar size={30} className="text-zinc-700 dark:text-slate-200" />
          <p className="text-lg font-semibold text-zinc-700 dark:text-slate-200">{`${
            data.horaInicio.split(":")[0]
          }h`}</p>
        </span>
        <Separator
          orientation="vertical"
          className="mx-3 w-1 dark:bg-slate-400"
        />
        <div className="flex flex-col md:mr-4 md:justify-start justify-center items-center w-full pr-16 md:pr-0">
          <div className="rounded-lg bg-muted relative w-36 h-52">
            <Image
              src={data.capaUrl}
              alt="capaDoFilme"
              fill
              className="object-fill rounded-md"
            />
          </div>
          <span className="w-full flex items-center justify-center mt-3">
            <Rating
              idFilme={data.idFilme}
              initialNota={data.avaliacao}
              readonly={!isCinema}
            />
          </span>
        </div>
      </div>
      <div className="w-full flex flex-col justify-between mt-5 md:mt-0 items-center md:items-start relative">
        <p className="font-semibold text-lg text-center  md:text-start">
          {data.nomeFilme}
        </p>
        <span className="flex flex-col gap-2">
          <span className="flex space-x-3 w-full items-start justify-start mt-2">
            <Calendar size={18} className="text-muted-foreground" />
            <p className="text-sm font-semibold text-muted-foreground">Data:</p>
            <p className="text-sm font-semibold text-muted-foreground">
              {data.dataSessao}
            </p>
          </span>

          <span className="flex space-x-3 w-full items-center justify-start">
            <Timer size={18} className="text-muted-foreground" />
            <p className="text-sm font-semibold text-muted-foreground">
              Horário:
            </p>
            <p className="text-sm font-semibold text-muted-foreground">
              {data.horaInicio}
            </p>
          </span>
        </span>
        <div className="w-full flex md:flex-row flex-col items-center md:items-start mt-3 md:mt-0 gap-5 md:gap-0 md:justify-between md:pr-5 md:pb-3">
          <span className="flex space-x-3">
            <Ticket size={25} />
            <Currency value={data.vlEntrada} />
          </span>
          {!isCinema && (
            <span className="flex xl:flex-row flex-col gap-3">
              <Button
                className="rounded-xl"
                onClick={() =>
                  router.push(
                    `/${params.idCinema}/sessoes/${idSessao}/tickets/new`
                  )
                }
              >
                <Plus size={18} className="mr-2" />
                Nova Venda
              </Button>
              <Button
                className="rounded-xl"
                onClick={() =>
                  router.push(`/${params.idCinema}/sessoes/${idSessao}/tickets`)
                }
              >
                <Ticket size={18} className="mr-2" />
                Gerenciar Tickets
              </Button>
              <Button
                className="rounded-xl"
                onClick={() =>
                  router.push(`/${params.idCinema}/sessoes/${idSessao}`)
                }
              >
                <Edit size={14} className="mr-2" />
                Editar Sessão
              </Button>
            </span>
          )}
          {isCinema && (
            <span className="flex xl:flex-row flex-col gap-3">
              <Button
                className="rounded-xl"
                onClick={async () => {
                  const assentosData = await getAssentosData();
                  if (assentosData) {
                    assentosModal.setReadonly(true);
                    assentosModal.onOpen(assentosData);
                  }
                }}
              >
                <Armchair size={18} className="mr-2" />
                Assentos Disponíveis
              </Button>
              <LoadingButton
                isLoading={loading}
                className="rounded-xl"
                onClick={async () => {
                  try {
                    setLoading(true);

                    const assentosData = await getAssentosData();

                    if (assentosData) {
                      createTicket.setAssentosData(assentosData);
                      createTicket.setData(data);
                      createTicket.setCredentials(undefined);
                      router.push(`/home/${data.idCinema}/${data.idSessao}`);
                    }
                  } finally {
                    setLoading(false);
                  }
                }}
              >
                <Ticket size={18} className="mr-2" />
                Comprar Ticket
              </LoadingButton>
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
