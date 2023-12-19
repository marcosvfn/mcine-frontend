import {
  horizontalVariant,
  opacityVariant,
} from "@/components/animate/Variants";
import AnimateSpan from "@/components/animate/span";
import ThemeSwitcher from "@/components/base/themeSwitcher";
import LoginForm from "@/components/form/LoginForm";
import { authOptions } from "@/lib/authOptions";
import { motion } from "framer-motion";
import { Mail, Github, Linkedin, Instagram } from "lucide-react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function RootPage() {
  const session = await getServerSession(authOptions);

  if (session?.user.id) {
    redirect("/");
  }

  return (
    <div className="items-center z-50 h-auto md:h-screen w-screen grid grid-cols-1 md:grid-cols-2 relative">
      <AnimateSpan
        variants={horizontalVariant}
        duration={1}
        className="h-full w-full bg-primary flex flex-col items-center relative p-24"
      >
        <AnimateSpan
          delay={0.7}
          variants={opacityVariant}
          duration={1.5}
          className="text-4xl flex-col flex font-extrabold tracking-tight lg:text-4xl my-auto relative text-white text-center max-w-lg"
        >
          Do backstage à experiência do espectador, tudo em um só lugar.
        </AnimateSpan>

        <div className="flex items-center justify-center space-x-3 mt-16 md:mt-0">
          <AnimateSpan direction="horizontal" delay={0.75}>
            <a href={`mailto:marcosvfn.dev@gmail.com`} target="_blank">
              <Mail
                size={25}
                className="text-white hover:text-zinc-300 transition-all duration-400 cursor-pointer hover:scale-[1.05]"
              />
            </a>
          </AnimateSpan>

          <AnimateSpan direction="horizontal" delay={1}>
            <a
              href="https://github.com/marcosviniciusfnascimento"
              target="_blank"
            >
              <Github
                size={25}
                className="text-white hover:text-zinc-300 transition-all duration-400 cursor-pointer hover:scale-[1.05]"
              />
            </a>
          </AnimateSpan>
          <AnimateSpan direction="horizontal" delay={1.25}>
            <a
              href="https://www.linkedin.com/in/marcos-nascimento-560642246/"
              target="_blank"
            >
              <Linkedin
                size={25}
                className="text-white hover:text-zinc-300 transition-all duration-400 cursor-pointer hover:scale-[1.05]"
              />
            </a>
          </AnimateSpan>
          <AnimateSpan direction="horizontal" delay={1.5}>
            <a href="https://instagram.com/mcode.tsx" target="_blank">
              <Instagram
                size={25}
                className="text-white hover:text-zinc-300 transition-all duration-400 cursor-pointer hover:scale-[1.05]"
              />
            </a>
          </AnimateSpan>
        </div>
      </AnimateSpan>
      <LoginForm />
      <span className="absolute top-5 right-5">
        <ThemeSwitcher />
      </span>
    </div>
  );
}
