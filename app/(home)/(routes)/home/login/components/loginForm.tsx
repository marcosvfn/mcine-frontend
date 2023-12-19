"use client";

import { TicketsActions } from "@/actions/tenant/tickets/api";

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
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import LoadingButton from "@/components/custom/LoadingButton";
import { useRouter } from "next/navigation";
import { CinemaModel } from "@/actions/root/cinema/api";
import toast from "react-hot-toast";
import { Popcorn, Store } from "lucide-react";
import HeadingCine from "@/components/base/headingCine";
import { Link } from "react-scroll";
import { motion } from "framer-motion";
import { horizontalVariant } from "@/components/animate/Variants";
import { cn } from "@/lib/utils";

interface NewTicketClientCinemaProps {
  data: CinemaModel[] | undefined;
}

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

export default function LoginCinemaForm(props: NewTicketClientCinemaProps) {
  const { data } = props;

  const filteredData = data?.filter((item) => item.id !== "root");

  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [idCinemaSelected, setIdCinemaSelected] = useState<string>();

  const form = useForm<CredentialsLoginFormValues>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      cpfReserva: "",
    },
  });

  const onSubmitLogin = async (values: CredentialsLoginFormValues) => {
    try {
      if (!idCinemaSelected) {
        toast.error("Selecione um cinema para realizar o login");
        return;
      }
      setLoading(true);
      const existingData = await TicketsActions.getTicketsByCpf(
        values.cpfReserva,
        undefined,
        idCinemaSelected
      );

      if (existingData && existingData.length) {
        router.push(`/home/login/${idCinemaSelected}/${values.cpfReserva}`);
        router.refresh();
      } else {
        toast.error(
          "Você não possui nenhum ticket comprado nesse cinema ainda!"
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <div className="w-full flex items-center space-x-2 my-5 mb-9 px-10">
        <Store size={35} />
        <HeadingCine
          title="Selecione o cinema"
          description="Informe o cinema para o qual deseja ver seus tickets"
        />
      </div>
      <div
        className={`max-w-5xl grid gap-5 grid-cols-1 pb-16 md:grid-cols-${filteredData?.length}`}
      >
        {filteredData &&
          filteredData.map((cinema) => (
            <Link
              key={cinema.id}
              to="login"
              spy={true}
              smooth={true}
              duration={500}
              onClick={() => {
                setIdCinemaSelected(cinema.id);
                setTimeout(() => {
                  form.setFocus("cpfReserva");
                }, 500);
              }}
            >
              <motion.div
                variants={horizontalVariant}
                transition={{
                  duration: 0.1,
                }}
                className={cn(
                  "text-white hover:-translate-y-2 flex-col transition-transform duration-300 cursor-pointer group relative h-80 w-64 bg-gradient-to-l from-card/70 to-card flex items-center justify-center rounded-xl shadow-lg dark:shadow-zinc-950 overflow-hidden",
                  idCinemaSelected === cinema.id && "ring-2 ring-primary"
                )}
              >
                <Popcorn
                  size={45}
                  className={cn(
                    "mx-auto my-5 group-hover:text-primary",
                    idCinemaSelected === cinema.id && "text-primary"
                  )}
                />
                <h5
                  className={cn(
                    "inset-0 font-extrabold text-lg group-hover:text-primary",
                    idCinemaSelected === cinema.id && "text-primary"
                  )}
                >
                  {cinema.nome}
                </h5>
              </motion.div>
            </Link>
          ))}
      </div>
      <div
        id="login"
        className="w-full bg-card p-5 md:p-16 lg:p-28 flex items-center gap-y-6 justify-center flex-col"
      >
        <>
          <span className="text-3xl font-semibold text-primary flex items-center justify-center mb-1">
            <Popcorn size={55} />
          </span>
          <h5 className="text-lg font-bold mb-1 w-full text-center">
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
      </div>
    </div>
  );
}
