"use client";

import { Trash } from "lucide-react";
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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import LoadingButton from "@/components/custom/LoadingButton";
import { SalaModel, SalasActions } from "@/actions/tenant/salas/api";

const FormSchema = z.object({
  nome: z.string().min(1, "Insira o nome da sala"),
  capacidade: z.number(),
  idCinema: z.string(),
});

export type SalaFormValues = z.infer<typeof FormSchema>;

interface SalaFormProps {
  initialData: SalaModel | null;
}

export default function SalaForm(props: SalaFormProps) {
  const { initialData } = props;
  const params = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const tenantId = String(params.idCinema);

  const title = initialData ? "Editar Sala" : "Criar Sala";
  const description = initialData ? "Editar uma Sala" : "Criar uma Sala";
  const toastMessage = initialData ? "Sala alterada" : "Sala Criada";
  const action = initialData ? "Salvar alterações" : "Criar";

  const form = useForm<SalaFormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: initialData || {
      nome: "",
      capacidade: 0,
      idCinema: String(params.idCinema),
    },
  });

  const onSubmit = async (data: SalaFormValues) => {
    try {
      setLoading(true);
      if (initialData) {
        await SalasActions.edit(String(params.id), data, tenantId);
      } else {
        await SalasActions.create(data, tenantId);
      }
      toast.success(toastMessage);
      router.push(`/${params.idCinema}/salas`);
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
      const response = await SalasActions.remove(String(params.id), tenantId);
      if (response.success) {
        toast.success("Sala excluída");
        router.push(`/${params.idCinema}/salas`);
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
          <div className="w-full flex flex-col sm:flex-row items-start md:items-center gap-5">
            <FormField
              control={form.control}
              name="nome"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Nome da sala..."
                      className="w-full md:w-96"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="capacidade"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Capacidade</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      disabled={loading}
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                      className="w-full lg:max-w-32"
                    />
                  </FormControl>
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
