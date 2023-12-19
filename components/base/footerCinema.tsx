import { Github, Instagram, Linkedin } from "lucide-react";
import Link from "next/link";

export default function FooterCinema() {
  return (
    <footer className="border-t bg-black dark:border-zinc-700">
      <div className="mx-auto py-10 flex flex-col gap-6 items-center px-5">
        <p className="text-center text-xs">
          &copy; {new Date().getFullYear()} Aplicação Demonstrativa. Todos os
          direitos reservados: {""}{" "}
          <Link
            href={"https://marcosnascimento.vercel.app/"}
            className="font-semibold text-primary"
          >
            Marcos Nascimento.
          </Link>
        </p>
        <span className="flex gap-x-3">
          <Link
            target={"_blank"}
            href={"https://github.com/marcosviniciusfnascimento"}
          >
            <Github className="text-muted-foreground hover:text-primary hover:scale-105 transistion-all duration-750" />
          </Link>
          <Link
            href={"https://www.linkedin.com/in/marcos-nascimento-560642246/"}
            target={"_blank"}
          >
            <Linkedin className="text-muted-foreground hover:text-primary hover:scale-105 transistion-all duration-750" />
          </Link>
          <Link target={"_blank"} href={"https://instagram.com/mcode.tsx"}>
            <Instagram className="text-muted-foreground hover:text-primary hover:scale-105 transistion-all duration-750" />
          </Link>
        </span>
      </div>
    </footer>
  );
}
