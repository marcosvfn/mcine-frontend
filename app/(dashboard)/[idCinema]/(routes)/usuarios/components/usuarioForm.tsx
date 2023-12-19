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
import { UsuarioActions, UsuarioModel } from "@/actions/root/usuario/api";

const FormSchema = z.object({
  nome: z.string().min(1, "Insira o nome do usuário"),
  email: z.string().email("Por favor insira um email válido..."),
  senha: z.string().min(8, "Sua senha deve ter pelo menos 8 carácteres"),
});

export type UsuarioFormValues = z.infer<typeof FormSchema>;

interface UsuarioFormProps {
  initialData: UsuarioModel | null;
}

export default function UsuarioForm(props: UsuarioFormProps) {
  const { initialData } = props;
  const params = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const title = initialData ? "Editar Usuário" : "Criar Usuário";
  const description = initialData ? "Editar um Usuário" : "Criar um Usuário";
  const toastMessage = initialData ? "Usuário alterado" : "Usuário Criado";
  const action = initialData ? "Salvar alterações" : "Criar";

  const form = useForm<UsuarioFormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: initialData || {
      nome: "",
      email: "",
      senha: "",
    },
  });

  const onSubmit = async (data: UsuarioFormValues) => {
    try {
      setLoading(true);
      if (initialData) {
        await UsuarioActions.edit(String(params.id), data);
      } else {
        await UsuarioActions.create(data);
      }
      toast.success(toastMessage);
      router.push(`/${params.idCinema}/usuarios`);
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
      const response = await UsuarioActions.remove(String(params.id));
      if (response.success) {
        toast.success("Usuário excluído");
        router.push(`/${params.idCinema}/usuarios`);
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
          className="space-y-8 w-full max-w-md"
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
                      placeholder="Nome do usuário..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Email do usuário..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {!initialData && (
              <FormField
                control={form.control}
                name="senha"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Senha</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder="Senha do usuário..."
                        {...field}
                        type="password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
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
