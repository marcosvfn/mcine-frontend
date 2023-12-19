"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { opacityVariant } from "../animate/Variants";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Input } from "../ui/input";
import LoadingButton from "../custom/LoadingButton";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import Image from "next/image";
import { LogIn, Popcorn } from "lucide-react";

const FormSchema = z.object({
  email: z
    .string()
    .min(1, "Por favor insira seu email")
    .email("Email inválido"),
  senha: z.string().min(1, "Por favor insira sua senha"),
});

type LoginFormType = z.infer<typeof FormSchema>;

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<LoginFormType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      senha: "",
    },
  });

  const onSubmit = async (values: LoginFormType) => {
    try {
      setIsLoading(true);

      const credentials = {
        email: values.email,
        password: values.senha,
        redirect: false,
      };

      const signInData = await signIn("credentials", credentials);

      if (!signInData?.ok) {
        toast.error("Usuário ou senha inválidos.");
      } else {
        setIsLoading(false);
        router.push("/");
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      animate="animate"
      initial="initial"
      variants={opacityVariant}
      transition={{
        duration: 1.5,
        delay: 3,
      }}
      className="w-full flex flex-col relative h-full items-center justify-center pt-8 md:pt-0"
    >
      <Link href="/home">
        <span className="text-3xl font-semibold text-primary flex items-center justify-center">
          <Popcorn size={40} />
        </span>
        <div className="w-36 h-16 relative mx-auto">
          <Image
            src={
              "https://res.cloudinary.com/dpmbuqjqj/image/upload/v1702862537/logo.mcine_mjupbm.svg"
            }
            alt="logo"
            fill
          />
        </div>
      </Link>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="max-w-sm w-full "
        >
          <div className="grid grid-cols-1 gap-5 w-full ">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input {...field} placeholder="Digite seu email..." />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="senha"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Digite sua senha..."
                      type="password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <LoadingButton
              type="submit"
              isLoading={isLoading}
              variant={"default"}
              className=" w-full rounded-md flex space-x-2 items-center justify-center"
            >
              <LogIn size={20} className="mr-4" />
              <h5>Acessar</h5>
            </LoadingButton>
          </div>
          <h5 className="text-foreground text-sm w-full text-center mt-5">
            Não possui acesso?
          </h5>
          <Link href="https://marcosnascimento.vercel.app//" target="_blank">
            <h5 className="text-primary text-sm w-full text-center cursor-pointer font-semibold">
              Entre em contato com o administrador
            </h5>
          </Link>
        </form>
      </Form>
      <span className="md:absolute md:bottom-24 flex flex-col items-center justify-center pt-12 md:pt-0">
        <p className="text-center text-xs">
          &copy; {new Date().getFullYear()} Aplicação Demonstrativa.
        </p>
        <p className="text-center text-xs">
          Todos os direitos reservados: {""}{" "}
          <Link
            href={"https://marcosnascimento.vercel.app/"}
            className="font-semibold text-primary"
          >
            Marcos Nascimento.
          </Link>
        </p>
      </span>
    </motion.div>
  );
}
