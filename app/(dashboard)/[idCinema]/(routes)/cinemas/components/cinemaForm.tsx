/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { Trash } from "lucide-react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";
import { CinemaActions, UsuarioCinemaModel } from "@/actions/root/cinema/api";
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
import UsersCinemaSelector from "./usersCinemaSelector";
import {
  useCinemaUserList,
  userCinemaList,
} from "@/app/hooks/useCinemaUserList";

const FormSchema = z.object({
  nome: z.string().min(1),
  usuariosCinema: z.array(
    z.object({
      isAdmin: z.boolean(),
      idUsuario: z.number(),
    })
  ),
});

export type CinemaFormValues = z.infer<typeof FormSchema>;

interface CinemaFormProps {
  initialData: UsuarioCinemaModel[] | null;
}

export default function CinemaForm(props: CinemaFormProps) {
  const { initialData } = props;
  const params = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const title = initialData?.length ? "Editar Cinema" : "Criar Cinema";
  const description = initialData?.length
    ? "Editar um Cinema"
    : "Criar um Cinema";
  const toastMessage = initialData?.length
    ? "Cinema alterado"
    : "Cinema Criado";
  const action = initialData?.length ? "Salvar alterações" : "Criar";
  const cinemaUsuariolist = useCinemaUserList();

  let formattedInitialData: CinemaFormValues | null = null;

  if (initialData && initialData.length > 0) {
    formattedInitialData = {
      nome: initialData[0].cinema.nome,
      usuariosCinema: initialData.map((item) => ({
        isAdmin: item.isAdmin,
        idUsuario: item.idUsuario,
      })),
    };
  }
  const form = useForm<CinemaFormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: formattedInitialData || {
      nome: "",
      usuariosCinema: [
        {
          isAdmin: false,
          idUsuario: 0,
        },
      ],
    },
  });

  useEffect(() => {
    if (!initialData?.length && cinemaUsuariolist.currentList.length) {
      cinemaUsuariolist.setList([]);
    }
  }, []);

  const onSubmit = async (data: CinemaFormValues) => {
    try {
      if (validateUserCinemaList(cinemaUsuariolist.currentList) === true) {
        setLoading(true);
        const usuariosCinema = cinemaUsuariolist.currentList.map((item) => ({
          isAdmin: item.isAdmin,
          idUsuario: item.id,
        }));
        if (initialData && initialData.length) {
          await CinemaActions.edit(String(params.id), {
            ...data,
            usuariosCinema,
          });
        } else {
          await CinemaActions.create({ ...data, usuariosCinema });
        }
        toast.success(toastMessage);
        router.push(`/${params.idCinema}/cinemas`);
        router.refresh();
      }
    } catch (error) {
      toast.error("Algo deu errado!");
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      const response = await CinemaActions.remove(String(params.id));
      if (response.success) {
        toast.success("Cinema excluído");
        router.push(`/${params.idCinema}/cinemas`);
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
                      placeholder="Nome do cinema..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </form>
      </Form>
      <Separator />
      <h5 className="text-xl font-semibold">Usuários</h5>
      <UsersCinemaSelector initialData={initialData} />
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

const validateUserCinemaList = (list: userCinemaList[]) => {
  if (!list.length) {
    toast.error("É necessário vincular pelo menos um usuário ao cinema");
    return false;
  }

  const hasAdmin = list.filter((item) => item.isAdmin === true).length > 0;

  if (!hasAdmin) {
    toast.error(
      "É necessário vincular pelo menos um usuário administrador ao cinema"
    );
    return false;
  }

  return true;
};
