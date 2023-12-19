"use client";

import { CalendarIcon, Trash } from "lucide-react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";
import AlertModal from "@/components/modals/alertModal";
import Heading from "@/components/base/heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import LoadingButton from "@/components/custom/LoadingButton";
import {
  SessaoCombinedType,
  SessaoInfoNomes,
  SessaoModel,
  SessoesActions,
} from "@/actions/tenant/sessoes/api";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FilmeModel } from "@/actions/root/filmes/api";
import { SalaModel } from "@/actions/tenant/salas/api";
import { Input } from "@/components/ui/input";
import {
  cn,
  currencyParser,
  handleInputCurrencyChange,
  maskCurrency,
} from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";

const FormSchema = z.object({
  idCinema: z.string().min(1, "Insira o cinema"),
  idFilme: z.string().min(1, "Insira o filme"),
  idSala: z.string().min(1, "Insira a sala"),
  horaInicio: z.string().min(1, "Insira o horário de início"),
  vlEntrada: z.number(),
  dtSessao: z.date(),
  agendarSemana: z.boolean().default(false),
});

export type SessaoFormValues = z.infer<typeof FormSchema>;

interface SessaoFormProps {
  initialData: SessaoCombinedType | null;
  filmesDisponiveis: FilmeModel[];
  salas: SalaModel[];
}

const HORARIOS_SESSOES = ["16:00", "18:00", "20:00", "22:00"];

export default function SessaoForm(props: SessaoFormProps) {
  const { initialData, filmesDisponiveis, salas } = props;
  const params = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const tenantId = String(params.idCinema);

  const title = initialData?.id ? "Editar Sessão" : "Criar Sessão";
  const description = initialData?.id
    ? "Editar uma Sessão"
    : "Criar uma Sessão";
  const toastMessage = initialData?.id ? "Sessão alterada" : "Sessão Criada";
  const action = initialData?.id ? "Salvar alterações" : "Criar";

  const formattedInitialData = {
    ...initialData,
    dtSessao: new Date(initialData?.dtSessao || new Date()),
    vlEntrada: Number(initialData?.vlEntrada) || 0,
    idCinema: String(params.idCinema),
  };
  const form = useForm<SessaoFormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: formattedInitialData || {
      idCinema: String(params.idCinema),
      idFilme: "",
      idSala: "",
      horaInicio: "",
      vlEntrada: 0,
      dtSessao: new Date(),
      agendarSemana: false,
    },
  });

  const onSubmit = async (data: SessaoFormValues) => {
    try {
      setLoading(true);
      if (initialData && initialData.id) {
        await SessoesActions.edit(String(params.id), data, tenantId);
      } else {
        await SessoesActions.create(data, tenantId);
      }
      toast.success(toastMessage);
      router.push(`/${params.idCinema}/sessoes`);
      router.refresh();
    } catch (error) {
      toast.error("Algo deu errado!");
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      const response = await SessoesActions.remove(String(params.id), tenantId);
      if (response.success) {
        toast.success("Sessão excluída");
        router.push(`/${params.idCinema}/sessoes`);
        router.refresh();
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error("Algo deu errado");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={() => onDelete()}
        loading={loading}
      />
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
        {initialData && (
          <Button
            disabled={loading}
            variant={"destructive"}
            size="sm"
            onClick={() => setOpen(true)}
          >
            {" "}
            <Trash className="text-white h-4 w-4" />
          </Button>
        )}
      </div>
      <Separator className="dark:bg-zinc-700" />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <div className="grid grid-cols-1 max-w-3xl gap-y-3 w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full ">
              <FormField
                control={form.control}
                name="idFilme"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Filme</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o filme..." />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {filmesDisponiveis.map((filme) => (
                          <SelectItem key={filme.id} value={filme.id}>
                            {filme.nome}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="idSala"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sala</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione a sala..." />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {salas.map((sala) => (
                          <SelectItem key={sala.id} value={sala.id}>
                            {sala.nome}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 col-span-2 ">
              <FormField
                control={form.control}
                name="horaInicio"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Hora de Início</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione horário..." />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {HORARIOS_SESSOES.map((horario) => (
                          <SelectItem key={horario} value={horario}>
                            {horario}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="dtSessao"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Data da sessão</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal hover:bg-card/80",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(new Date(field.value), "dd/MM/yyyy")
                            ) : (
                              <span>Escolha uma data</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          fromYear={2023}
                          toYear={2024}
                          selected={field.value}
                          onSelect={field.onChange}
                          initialFocus
                          locale={ptBR}
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="vlEntrada"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Valor Entrada</FormLabel>
                    <FormControl>
                      <Input
                        onInput={handleInputCurrencyChange}
                        className="rounded-sm"
                        disabled={loading}
                        autoComplete={"off"}
                        value={maskCurrency(field.value)}
                        onChange={(e) => {
                          if (e) {
                            const parsedValue = currencyParser(e.target.value);
                            form.setValue("vlEntrada", parsedValue);
                          }
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="agendarSemana"
              render={({ field }) => (
                <FormItem className="mt-2 bg-card flex flex-row w-full col-span-2 items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Agendar para toda semana</FormLabel>
                    <FormDescription>
                      Essa opção cria uma sessão com os mesmos parâmetros para
                      os próximos 7 dias após a data informada, caso os horários
                      estejam disponíveis.
                    </FormDescription>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <LoadingButton
            disabled={loading}
            isLoading={loading}
            onClick={form.handleSubmit(onSubmit)}
          >
            {action}
          </LoadingButton>
        </form>
      </Form>
      <Separator />
    </>
  );
}
