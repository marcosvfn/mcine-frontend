/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { AssentosDisponiveisReturn } from "@/actions/tenant/assentos/api";
import { SessoesFilmesInfo } from "@/actions/tenant/salas/api";
import { TicketsActions } from "@/actions/tenant/tickets/api";
import Image from "next/image";

import { useAssentoModal } from "@/app/hooks/useAssentosModal";
import { UserCredentials } from "@/app/hooks/useCreateTicket";
import { DataTable } from "@/components/tables/dataTable";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { UserTicketsColumns, columns } from "./columns";
import {
  Calendar,
  CheckCheck,
  LucideTimer,
  Minus,
  Plus,
  Sofa,
  Ticket,
} from "lucide-react";
import Currency from "@/components/base/currency";
import Rating from "@/components/base/rating";
import toast from "react-hot-toast";
import { CPFParser } from "@/lib/utils";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import LoadingComponent from "@/components/base/loadingComponent";

interface NewTicketClientCinemaProps {
  data: SessoesFilmesInfo | undefined;
  assentos: AssentosDisponiveisReturn | null;
  existingTickets: UserTicketsColumns[] | null;
}

export type CredenciaisReserva = {
  cpfReserva: string;
};
export const CredentialsCompraFormSchema = z.object({
  nomeReserva: z.string().min(1, "Insira um nome para a reserva"),
  cpfReserva: z
    .string()
    .regex(
      /^([0-9]{3}\.?[0-9]{3}\.?[0-9]{3}\-?[0-9]{2}|[0-9]{2}\.?[0-9]{3}\.?[0-9]{3}\/?[0-9]{4}\-?[0-9]{2})$/,
      "Informe um cpf válido"
    )
    .min(11, "Informe um cpf válido")
    .max(11),
});

export type CredentialsCompraFormValues = z.infer<
  typeof CredentialsCompraFormSchema
>;

export default function NewTicketClientCinema(
  props: NewTicketClientCinemaProps
) {
  const { data, assentos, existingTickets } = props;

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => setIsMounted(true), []);

  const router = useRouter();
  const params = useParams();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const assentosModal = useAssentoModal();

  const [quantidade, setQuantidade] = useState(1);

  const credentials: UserCredentials = {
    nomeReserva:
      existingTickets && existingTickets.length > 0
        ? existingTickets![0].nomeReserva
        : "",
    cpfReserva: String(params.cpf),
  };

  const compraEfetuada = searchParams.get("success");

  if (compraEfetuada && !existingTickets?.length) {
    router.push("/home");
  }
  const formCompra = useForm<CredentialsCompraFormValues>({
    resolver: zodResolver(CredentialsCompraFormSchema),
    defaultValues: credentials,
  });

  const onSubmitCompra = async (values: CredentialsCompraFormValues) => {
    if (assentosModal.selectedAssentosId.length !== quantidade) {
      toast.error(
        "Quantidade de assentos selecionados não confere com a quantidade de ingressos!"
      );
      return;
    }

    const insertData = assentosModal.selectedAssentosId.map((idAssento) => ({
      idAssento,
      idSessao: data!.idSessao,
      nomeReserva: values.nomeReserva,
      cpfReserva: CPFParser(values.cpfReserva),
    }));

    const response = await TicketsActions.create(
      insertData,
      String(data!.idCinema)
    );
    if (response) {
      router.push(`${pathname}?success=1`);
      router.refresh();
      assentosModal.setSelectedAssentosId([]);
      assentosModal.setSelectedAssentosNumero([]);
    }
  };

  if (!isMounted) return <LoadingComponent />;

  return (
    <>
      <div className="w-full bg-card px-0 flex p-8 items-center gap-y-6 justify-center flex-col">
        {compraEfetuada && (
          <div className="relative flex flex-col bg-card w-full items-center justify-between h-full p-10 ">
            <span className="flex space-x-3 items-center ">
              <CheckCheck
                className="text-green-700 animate-in transform transition-all duration-500"
                size={45}
              />
              <h5 className="tracking-tight font-extrabold text-2xl w-full text-start">
                Compra efetuada!
              </h5>
            </span>

            <span className=" flex flex-col gap-y-1 items-center">
              <Link
                href={`${pathname}`}
                className="font-semibold text-sm text-muted-foreground hover:underline"
              >
                Continuar comprando
              </Link>
              <Link
                href={"/home"}
                className="font-semibold text-sm text-primary hover:underline"
              >
                Ver mais sessões
              </Link>
            </span>
          </div>
        )}
        {data && credentials && !compraEfetuada && (
          <>
            {credentials.nomeReserva && (
              <h5 className="tracking-tight px-8 font-extrabold text-3xl w-full text-start">{`Olá, ${credentials.nomeReserva}`}</h5>
            )}
            <div className="w-full px-8 gap-10 grid grid-cols-1 xl:grid-cols-2 h-auto">
              <div className="flex h-full flex-col ">
                <h5 className="text-xl text-muted-foreground font-semibold my-2">
                  Sessão
                </h5>
                <div className="flex  bg-muted h-full md:flex-row flex-col gap-5 p-5 border rounded-2xl w-full shadow-lg">
                  <div className="flex flex-col w-full md:w-auto md:items-start items-center h-full">
                    <div className="rounded-lg bg-muted w-40 h-56 relative">
                      <Image
                        src={data.capaUrl}
                        alt="capaDoFilme"
                        fill
                        className="object-fill aspect-square rounded-md"
                      />
                    </div>
                    <span className="w-full flex items-center justify-center mt-3">
                      <Rating
                        idFilme={data.idFilme}
                        initialNota={data.avaliacao}
                        readonly
                      />
                    </span>
                  </div>
                  <div className="flex flex-col w-full">
                    <div className="flex flex-col md:w-auto w-full items-center md:items-start  gap-5">
                      <p className="font-semibold text-lg md:text-start text-center">
                        {data.nomeFilme}
                      </p>
                      <span className="flex flex-col gap-2">
                        <span className="flex space-x-3 items-center justify-start">
                          <Calendar
                            className="text-muted-foreground"
                            size={18}
                          />
                          <p className="text-sm md:text-md font-semibold text-muted-foreground">
                            Data:
                          </p>
                          <p className="text-sm md:text-md font-semibold text-muted-foreground">
                            {data.dataSessao}
                          </p>
                        </span>

                        <span className="flex space-x-3 items-center justify-start">
                          <LucideTimer
                            size={20}
                            className="text-muted-foreground"
                          />
                          <p className="text-sm md:text-md font-semibold text-muted-foreground">
                            Horário:
                          </p>
                          <p className="text-sm md:text-md font-semibold text-muted-foreground">
                            {data.horaInicio}
                          </p>
                        </span>
                      </span>
                      <span className="flex space-x-3 h-auto md:h-full items-start md:items-end md:pb-8">
                        <Ticket size={25} />
                        <Currency value={data.vlEntrada} />
                      </span>
                    </div>

                    <div className="flex flex-col items-center w-full justify-center gap-5">
                      <h5 className="text-muted-foreground text-md">
                        Quantidade
                      </h5>
                      <span className="flex gap-x-3">
                        <Button
                          onClick={() => {
                            if (quantidade === 1) {
                              return null;
                            }
                            setQuantidade(quantidade - 1);
                          }}
                          className="rounded-full px-2 py-1"
                        >
                          <Minus size={20} />
                        </Button>
                        <h5 className="text-3xl font-semibold">{quantidade}</h5>
                        <Button
                          onClick={() => setQuantidade(quantidade + 1)}
                          className="rounded-full  px-2 py-1"
                        >
                          <Plus size={20} />
                        </Button>
                      </span>
                      <Currency value={data.vlEntrada * quantidade} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col lg:flex-1">
                <h5 className="text-lg text-muted-foreground font-semibold my-2">
                  Dados de Compra
                </h5>
                <div className="flex bg-muted flex-col gap-5 border rounded-2xl shadow-lg p-5 flex-1 ">
                  <Form {...formCompra}>
                    <form
                      onSubmit={formCompra.handleSubmit(onSubmitCompra)}
                      className="w-full"
                    >
                      <div className="grid grid-cols-1 gap-5">
                        <FormField
                          control={formCompra.control}
                          name="nomeReserva"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Nome</FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  placeholder="Digite seu nome..."
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={formCompra.control}
                          name="cpfReserva"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>CPF</FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  placeholder="Digite seu cpf..."
                                />
                              </FormControl>
                              <FormDescription>Somente números</FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </form>
                  </Form>
                  <div className="flex flex-col first-line:space-x-3 w-full items-center justify-center ">
                    <span className="flex flex-col gap-2 items-center text-sm text-muted-foreground">
                      <Button
                        onClick={() => {
                          if (assentos) {
                            assentosModal.setReadonly(false);
                            assentosModal.onOpen(assentos);
                          }
                        }}
                        variant={"secondary"}
                        className="max-w-sm bg-card hover:bg-card/80"
                      >
                        <Sofa className="mr-2 " />
                        Selecionar Assentos
                      </Button>
                      {assentosModal.selectedAssentosNumero.length > 0 && (
                        <>
                          <h5 className="font-semibold text-center">
                            Assentos Selecionados:
                          </h5>
                          <span className="flex gap-2 justify-center">
                            {assentosModal.selectedAssentosNumero.map(
                              (assento) => (
                                <Badge key={assento}>{assento}</Badge>
                              )
                            )}
                          </span>
                        </>
                      )}
                    </span>
                    <Button
                      onClick={formCompra.handleSubmit(onSubmitCompra)}
                      className="mt-5 max-w-sm"
                    >
                      Confirmar
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

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
