"use client";

import { CalendarIcon, Trash } from "lucide-react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
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
import { Input } from "@/components/ui/input";
import LoadingButton from "@/components/custom/LoadingButton";
import { FilmeModel, FilmesActions } from "@/actions/root/filmes/api";
import { Textarea } from "@/components/ui/textarea";
import ImageUpload from "@/components/custom/ImageUpload";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { ptBR } from "date-fns/locale";
import { Checkbox } from "@/components/ui/checkbox";

const FormSchema = z.object({
  nome: z.string().min(1, "Insira o nome do usuário"),
  sinopse: z.string().min(1, "Por favor insira a sinopse do filme..."),
  capaUrl: z.string().min(1, "Adicione a imagem de capa do filme"),
  dtLancamento: z.date(),
  disponivel: z.boolean(),
  linkTrailer: z.string().min(1, "Por favor insira o trailer do filme..."),
});

export type FilmeFormValues = z.infer<typeof FormSchema>;

interface FilmeFormProps {
  initialData: FilmeModel | null;
}

export default function FilmeForm(props: FilmeFormProps) {
  const { initialData } = props;
  const params = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const title = initialData?.id ? "Editar Filme" : "Criar Filme";
  const description = initialData?.id ? "Editar um Filme" : "Criar um Filme";
  const toastMessage = initialData?.id ? "Filme alterado" : "Filme Criado";
  const action = initialData?.id ? "Salvar alterações" : "Criar";

  const form = useForm<FilmeFormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: initialData
      ? {
          ...initialData,
          dtLancamento:
            initialData && initialData.dtLancamento
              ? new Date(String(initialData?.dtLancamento))
              : new Date(),
        }
      : {
          nome: "",
          sinopse: "",
          capaUrl: "",
          dtLancamento: new Date(),
          disponivel: true,
        },
  });

  const onSubmit = async (data: FilmeFormValues) => {
    try {
      setLoading(true);
      const formattedData = {
        ...data,
        dtLancamento: new Date(data.dtLancamento),
      };

      if (initialData?.id) {
        await FilmesActions.edit(String(params.id), formattedData);
      } else {
        await FilmesActions.create(formattedData);
      }
      toast.success(toastMessage);
      router.push(`/${params.idCinema}/filmes`);
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
      const response = await FilmesActions.remove(String(params.id));
      if (response.success) {
        toast.success("Filme excluído");
        router.push(`/${params.idCinema}/filmes`);
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
          <div className="grid grid-cols-1 gap-8">
            <FormField
              control={form.control}
              name="nome"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Nome do filme..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="sinopse"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sinopse</FormLabel>
                  <FormControl>
                    <Textarea
                      disabled={loading}
                      placeholder="Sinopse do filme..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-start justify-end md:items-end flex-col md:flex-row gap-3 w-full">
              <FormField
                control={form.control}
                name="dtLancamento"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Data de Lançamento</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-[240px] pl-3 text-left font-normal hover:bg-card/80",
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
                name="linkTrailer"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Link do Trailer</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder="Link do trailer..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="capaUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Capa</FormLabel>
                  <FormControl>
                    <ImageUpload
                      value={field.value ? [field.value] : []}
                      disabled={loading}
                      onChange={(url) => field.onChange(url)}
                      onRemove={() => field.onChange("")}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="disponivel"
              render={({ field }) => (
                <FormItem className="flex flex-row bg-card max-w-2xl items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Disponível</FormLabel>
                    <FormDescription>
                      Essa opção permite que os cinemas selecionem esse filme
                      para exibir em suas seções.
                    </FormDescription>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </form>
      </Form>
      <LoadingButton
        disabled={loading}
        isLoading={loading}
        onClick={form.handleSubmit(onSubmit)}
      >
        {action}
      </LoadingButton>
      <Separator />
    </>
  );
}
