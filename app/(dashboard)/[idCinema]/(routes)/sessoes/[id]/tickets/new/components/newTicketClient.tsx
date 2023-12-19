"use client";

import {
  AssentoActions,
  AssentosDisponiveisReturn,
} from "@/actions/tenant/assentos/api";
import { SessaoCombinedType } from "@/actions/tenant/sessoes/api";
import { TicketsActions } from "@/actions/tenant/tickets/api";
import { useAssentoModal } from "@/app/hooks/useAssentosModal";
import Currency from "@/components/base/currency";
import Heading from "@/components/base/heading";
import Rating from "@/components/base/rating";
import {
  CredentialsFormSchema,
  CrendentialsFormValues,
} from "@/components/form/LoginCpfForm";
import { Badge } from "@/components/ui/badge";
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
import { Separator } from "@/components/ui/separator";
import { CPFParser } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { Calendar, LucideTimer, Minus, Plus, Sofa, Ticket } from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

interface NewTicketClientProps {
  sessaoData: SessaoCombinedType | null;
  capaFilme: string | null;
  avaliacao: number;
}

export default function NewTicketClient(props: NewTicketClientProps) {
  const { sessaoData, capaFilme, avaliacao } = props;

  const assentosModal = useAssentoModal();
  const params = useParams();
  const router = useRouter();

  const [quantidade, setQuantidade] = useState(1);
  const [assentosData, setAssentosData] = useState<AssentosDisponiveisReturn>();

  const form = useForm<CrendentialsFormValues>({
    resolver: zodResolver(CredentialsFormSchema),
    defaultValues: {
      cpfReserva: "",
      nomeReserva: "",
    },
  });

  const onSubmit = async (data: CrendentialsFormValues) => {
    if (assentosModal.selectedAssentosId.length !== quantidade) {
      toast.error(
        "Quantidade de assentos selecionados não confere com a quantidade de ingressos!"
      );
      return;
    }

    const insertData = assentosModal.selectedAssentosId.map((idAssento) => ({
      idAssento,
      idSessao: sessaoData!.id,
      nomeReserva: data.nomeReserva,
      cpfReserva: CPFParser(data.cpfReserva),
    }));

    const response = await TicketsActions.create(
      insertData,
      String(params.idCinema)
    );
    if (response) {
      toast.success("Operação efetuada com sucesso!");
      router.push(`/${params.idCinema}/sessoes/${params.id}/tickets`);
      router.refresh();
      assentosModal.setSelectedAssentosId([]);
      assentosModal.setSelectedAssentosNumero([]);
    }
  };

  useEffect(() => {
    if (assentosData?.sessao.id !== sessaoData?.id) {
      AssentoActions.getAssentosDisponiveis(
        sessaoData!.id,
        undefined,
        String(params.idCinema)
      ).then((response) => {
        if (response) {
          setAssentosData(response);
        }
      });
    }
  }, [sessaoData, params.idCinema, assentosData?.sessao.id]);

  if (!sessaoData || !capaFilme) return null;

  return (
    <>
      <span className="flex items-center gap-3">
        <Ticket size={40} />
        <Heading
          title={`Novo Ticket`}
          description="Informe os dados para comprar um novo ticket"
        />
      </span>
      <Separator className="dark:bg-zinc-700" />
      <div className="w-full gap-10 grid grid-cols-1 xl:grid-cols-2">
        <div>
          <h5 className="text-xl text-muted-foreground font-semibold my-2">
            Sessão
          </h5>
          <div className="flex bg-card md:flex-row flex-col gap-5 p-5 border rounded-2xl w-full shadow-lg">
            <div className="flex flex-col w-full md:w-auto md:items-start items-center">
              <div className="rounded-lg bg-muted w-40 h-56 relative">
                <Image
                  src={capaFilme}
                  alt="capaDoFilme"
                  fill
                  className="object-fill aspect-square rounded-md"
                />
              </div>
              <span className="w-full flex items-center justify-center mt-3">
                <Rating
                  idFilme={sessaoData.idFilme}
                  initialNota={avaliacao}
                  readonly
                />
              </span>
            </div>
            <div className="flex flex-col w-full">
              <div className="flex flex-col md:w-auto w-full items-center md:items-start  gap-5">
                <p className="font-semibold text-lg md:text-start text-center">
                  {sessaoData.nomeFilme}
                </p>
                <span className="flex flex-col gap-2">
                  <span className="flex space-x-3 items-center justify-start">
                    <Calendar className="text-muted-foreground" size={18} />
                    <p className="text-sm md:text-md font-semibold text-muted-foreground">
                      Data:
                    </p>
                    <p className="text-sm md:text-md font-semibold text-muted-foreground">
                      {format(new Date(sessaoData.dtSessao), "dd/MM/yyyy")}
                    </p>
                  </span>

                  <span className="flex space-x-3 items-center justify-start">
                    <LucideTimer size={20} className="text-muted-foreground" />
                    <p className="text-sm md:text-md font-semibold text-muted-foreground">
                      Horário:
                    </p>
                    <p className="text-sm md:text-md font-semibold text-muted-foreground">
                      {sessaoData.horaInicio}
                    </p>
                  </span>
                </span>
                <span className="flex space-x-3 h-auto md:h-full items-start md:items-end md:pb-8">
                  <Ticket size={25} />
                  <Currency value={sessaoData.vlEntrada} />
                </span>
              </div>

              <div className="flex flex-col items-center w-full justify-center gap-5">
                <h5 className="text-muted-foreground text-md">Quantidade</h5>
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
                <Currency value={sessaoData.vlEntrada * quantidade} />
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col lg:flex-1">
          <h5 className="text-lg text-muted-foreground font-semibold my-2">
            Dados de Compra
          </h5>
          <div className="flex flex-col gap-5 border rounded-2xl shadow-lg p-5 flex-1  bg-card">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
                <div className="grid grid-cols-1 gap-5">
                  <FormField
                    control={form.control}
                    name="nomeReserva"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nome</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Digite seu nome..." />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="cpfReserva"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>CPF</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Digite seu cpf..." />
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
                    if (assentosData) {
                      assentosModal.setReadonly(false);
                      assentosModal.onOpen(assentosData);
                    }
                  }}
                  variant={"secondary"}
                  className="max-w-sm"
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
                      {assentosModal.selectedAssentosNumero.map((assento) => (
                        <Badge key={assento}>{assento}</Badge>
                      ))}
                    </span>
                  </>
                )}
              </span>
              <Button
                onClick={form.handleSubmit(onSubmit)}
                className="mt-5 max-w-sm"
              >
                Confirmar
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
