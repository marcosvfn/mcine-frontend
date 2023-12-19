import { FilmeModel } from "@/actions/root/filmes/api";
import Rating from "@/components/base/rating";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { format } from "date-fns";
import { Calendar, Info, PlayCircle, Ticket } from "lucide-react";
import Image from "next/image";
import { Link } from "react-scroll";

interface maisInformacoesProps {
  data: FilmeModel;
  callback: (idFilme: string) => void;
}

export default function MaisInformacoes(props: maisInformacoesProps) {
  const { data, callback } = props;

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="flex gap-x-2 rounded-full">
          <Info />
          Mais informações
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="max-w-screen">
        <SheetHeader>
          <div className="h-72 w-52 relative overflow-hidden rounded-xl mx-auto">
            <Image alt="posterFilme" src={data.capaUrl} fill />
          </div>
          <Rating
            idFilme={data.id}
            initialNota={data.avaliacao}
            readonly={false}
          />
          <Separator className="dark:bg-zinc-700 my-3" />
          <SheetTitle>{data.nome}</SheetTitle>
          <SheetDescription>{data.sinopse}</SheetDescription>
        </SheetHeader>
        <span className="flex items-center gap-x-2 text-sm tracking-tight mt-10">
          <Calendar size={35} />
          <span className="flex flex-col gap-y-1">
            <h5 className="text-muted-foreground font-medium text-xs">
              Data de Lançamento
            </h5>
            {format(new Date(data.dtLancamento), "dd/MM/yyyy")}
          </span>
        </span>
        <span className="flex gap-x-2 h-full justify-center mt-24">
          <a href={data.linkTrailer} target="_blank">
            <Button className="flex gap-x-2 rounded-full">
              <PlayCircle />
              Trailer
            </Button>
          </a>
          <SheetClose asChild>
            <Link
              to="tickets"
              spy={true}
              smooth={true}
              duration={500}
              onClick={() => callback(data.id)}
            >
              <Button className="flex gap-x-2 rounded-full">
                <Ticket />
                Tickets
              </Button>
            </Link>
          </SheetClose>
        </span>
      </SheetContent>
    </Sheet>
  );
}
