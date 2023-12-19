"use client";

import { SessoesFilmesInfo } from "@/actions/tenant/salas/api";
import { TicketsActions } from "@/actions/tenant/tickets/api";

import { useCreateTicket } from "@/app/hooks/useCreateTicket";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import LoadingButton from "@/components/custom/LoadingButton";
import { useParams, useRouter } from "next/navigation";
import { Popcorn } from "lucide-react";
import Loading from "@/app/(home)/loading";

interface NewTicketClientCinemaProps {
  data: SessoesFilmesInfo | undefined;
}

export type CredenciaisReserva = {
  cpfReserva: string;
};

export const LoginFormSchema = z.object({
  cpfReserva: z
    .string()
    .regex(
      /^([0-9]{3}\.?[0-9]{3}\.?[0-9]{3}\-?[0-9]{2}|[0-9]{2}\.?[0-9]{3}\.?[0-9]{3}\/?[0-9]{4}\-?[0-9]{2})$/,
      "Informe um cpf válido"
    )
    .min(11, "Informe um cpf válido")
    .max(11),
});

export type CredentialsLoginFormValues = z.infer<typeof LoginFormSchema>;

export default function NewTicketLoginForm(props: NewTicketClientCinemaProps) {
  const { data } = props;

  const router = useRouter();
  const params = useParams();
  const createTicket = useCreateTicket();

  const [loading, setLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => setIsMounted(true), []);

  const form = useForm<CredentialsLoginFormValues>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      cpfReserva: "",
    },
  });

  const onSubmitLogin = async (values: CredentialsLoginFormValues) => {
    try {
      setLoading(true);
      const existingData = await TicketsActions.getTicketsByCpf(
        values.cpfReserva,
        undefined,
        data!.idCinema
      );

      if (existingData && existingData.length) {
        createTicket.setCredentials({
          cpfReserva: values.cpfReserva,
          nomeReserva: existingData[0].nomeReserva,
        });
        router.push(
          `/home/${params.idCinema}/${params.idSessao}/${values.cpfReserva}`
        );
        router.refresh();
      } else {
        createTicket.setCredentials({
          cpfReserva: values.cpfReserva,
          nomeReserva: "",
        });

        if (!params.cpf) {
          router.push(
            `/home/${params.idCinema}/${params.idSessao}/${values.cpfReserva}`
          );
        }
      }
    } finally {
      setLoading(false);
    }
  };

  if (!isMounted) return <Loading />;

  return (
    <>
      <div className="w-full bg-card p-8 pt-6 flex items-center gap-y-6 justify-center flex-col">
        {!createTicket.credentials && (
          <>
            <span className="text-3xl font-semibold text-primary flex items-center justify-center mb-1">
              <Popcorn size={55} />
            </span>
            <h5 className="text-lg font-bold mb-5 w-full text-center">
              Informe seu CPF
            </h5>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmitLogin)}
                className="max-w-sm w-full"
              >
                <div className="grid grid-cols-1 gap-5 w-full ">
                  <FormField
                    control={form.control}
                    name="cpfReserva"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input {...field} placeholder="Digite seu cpf..." />
                        </FormControl>
                        <FormDescription>Somente números</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <LoadingButton
                    isLoading={loading}
                    onClick={form.handleSubmit(onSubmitLogin)}
                    className=" w-full rounded-md flex space-x-2 items-center justify-center"
                  >
                    <h5>Continuar</h5>
                  </LoadingButton>
                </div>
              </form>
            </Form>
          </>
        )}
      </div>
    </>
  );
}
