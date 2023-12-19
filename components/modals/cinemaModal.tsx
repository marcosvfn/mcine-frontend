"use client";

import ModalDefault from "@/components/modals/modal";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { useState } from "react";
import axios from "axios";
import { useCinemaModal } from "@/app/hooks/useCinemaModal";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import LoadingButton from "../custom/LoadingButton";
import { CinemaActions, EditCinema } from "@/actions/root/cinema/api";
import { useSession } from "next-auth/react";

const FormSchema = z.object({
  nome: z.string().min(1),
});

export default function CinemaModal() {
  const storeModal = useCinemaModal();
  const [loading, setIsLoading] = useState(false);

  const session = useSession();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      nome: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    try {
      setIsLoading(true);

      const createData: EditCinema = {
        ...values,
        usuariosCinema: [
          {
            idUsuario: Number(session?.data?.user.id),
            isAdmin: true,
          },
        ],
      };

      const response = await CinemaActions.create(createData);

      if (response) {
        window.location.assign(`/${response.id}`);
      }
    } catch (error) {
      toast.error("Algo deu errado!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ModalDefault
      title="Cadastrar novo cinema"
      description="Adicione um novo cinema para gerenciar sessões e vendas"
      isOpen={storeModal.isOpen}
      onClose={storeModal.onClose}
    >
      <div>
        <div className="space-y-4 py-2 pb-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name={"nome"}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder="Digite o nome do cinema..."
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <div className="pt-6 space-x-2 flex items-center justify-end w-full">
                <Button
                  disabled={loading}
                  onClick={storeModal.onClose}
                  className="rounded-lg"
                  variant={"outline"}
                >
                  Cancelar
                </Button>
                <LoadingButton
                  isLoading={loading}
                  className="rounded-lg"
                  type="submit"
                >
                  Continuar
                </LoadingButton>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </ModalDefault>
  );
}
