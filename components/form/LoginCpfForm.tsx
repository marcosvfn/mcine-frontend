"use client";
import { z } from "zod";
import { Form, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormControl, FormField, FormItem, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useCreateTicket } from "@/app/hooks/useCreateTicket";

export type CredenciaisReserva = {
  nomeReserva: string;
  cpfReserva: string;
};

interface LoginCpfFormProps {
  setCredentials: (data: CredenciaisReserva) => void;
}

export const CredentialsFormSchema = z.object({
  nomeReserva: z.string().min(1, "Informe um nome para registrar a reserva"),
  cpfReserva: z
    .string()
    .regex(
      /^([0-9]{3}\.?[0-9]{3}\.?[0-9]{3}\-?[0-9]{2}|[0-9]{2}\.?[0-9]{3}\.?[0-9]{3}\/?[0-9]{4}\-?[0-9]{2})$/,
      "Informe um cpf válido"
    )
    .min(11, "Informe um cpf válido")
    .max(11),
});

export type CrendentialsFormValues = z.infer<typeof CredentialsFormSchema>;

export default function LoginCpfForm(props: LoginCpfFormProps) {
  const createTicket = useCreateTicket();
  const form = useForm<CrendentialsFormValues>({
    resolver: zodResolver(CredentialsFormSchema),
    defaultValues: {
      cpfReserva: "",
      nomeReserva: "",
    },
  });

  const onSubmit = (data: CrendentialsFormValues) => {
    //
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-sm w-full">
        <div className="grid grid-cols-1 gap-5 w-full ">
          <FormField
            control={form.control}
            name="nomeReserva"
            render={({ field }) => (
              <FormItem>
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
                <FormControl>
                  <Input {...field} placeholder="Digite seu cpf..." />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            variant={"default"}
            className=" w-full rounded-md flex space-x-2 items-center justify-center"
          >
            <h5>Continuar</h5>
          </Button>
        </div>
      </form>
    </Form>
  );
}
