/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import {
  FilmeModel,
  FilmesActions,
  SessoesDisponiveis,
} from "@/actions/root/filmes/api";
import { useRef, useState } from "react";
import FilmesCarousel from "./filmesCarousel";
import { Calendar, Popcorn, Store } from "lucide-react";
import { horizontalVariant } from "@/components/animate/Variants";
import { QuadroDeHorariosType, SalasActions } from "@/actions/tenant/salas/api";
import { motion } from "framer-motion";
import { Link } from "react-scroll";
import { cn } from "@/lib/utils";
import QuadroClient from "@/app/(dashboard)/[idCinema]/(routes)/quadro/components/quadroClient";
import HeadingCine from "@/components/base/headingCine";
import { useTheme } from "next-themes";
import NoData from "@/components/base/noData";
import LoadingComponent from "@/components/base/loadingComponent";
import SessoesByFilme from "./sessoesByFilme";
import {
  SessoesActions,
  SessoesByFilme as SessoesByFilmeType,
} from "@/actions/tenant/sessoes/api";
import { Button } from "@/components/ui/button";
import { useInView } from "framer-motion";

interface HomeClientProps {
  slides: FilmeModel[];
}

export default function HomeClient(props: HomeClientProps) {
  const { slides } = props;
  const { theme, setTheme } = useTheme();

  if (theme === "light") {
    setTheme("dark");
  }

  const [idFilmeSelected, setIdFilmeSelected] = useState<string>();
  const [loading, setLoading] = useState(false);
  const [sessoesDisponeisData, setSessoesDisponiveisData] =
    useState<SessoesDisponiveis>();
  const [sessoesByFilmeData, setSessoesByFilmeData] =
    useState<SessoesByFilmeType>();

  const [quadroDeHorariosData, setQuadroDeHorariosData] =
    useState<QuadroDeHorariosType[]>();
  const [idCinemaSelected, setIdCinemaSelected] = useState<string>();

  const ticketsDivRef = useRef<HTMLDivElement>(null);
  const sessoesDivRef = useRef<HTMLDivElement>(null);
  const quadroHorariosRef = useRef<HTMLDivElement>(null);

  const ticketsIsInView = useInView(ticketsDivRef);
  const sessoesIsInView = useInView(sessoesDivRef);
  const quadroIsInView = useInView(ticketsDivRef);

  const getSessoesDisponiveisByFilme = async (
    idFilme: string,
    scroll: boolean
  ) => {
    try {
      setQuadroDeHorariosData(undefined);
      setSessoesByFilmeData(undefined);
      setIdCinemaSelected(undefined);
      setIdFilmeSelected(idFilme);
      setLoading(true);

      const response = await FilmesActions.getSessoesDisponiveis(idFilme);

      if (response) {
        setSessoesDisponiveisData(response);
        setTimeout(() => {
          if (!ticketsIsInView && scroll) {
            ticketsDivRef.current?.scrollIntoView({ behavior: "smooth" });
          }
        }, 500);
      }
    } finally {
      setLoading(false);
    }
  };

  const getQuadroDeHorariosByCinema = async (idCinema: string) => {
    const response = await SalasActions.getQuadroDeHorarios(
      undefined,
      idCinema
    );

    setIdCinemaSelected(idCinema);

    if (response) {
      setQuadroDeHorariosData(response);
      setTimeout(() => {
        if (!quadroIsInView) {
          quadroHorariosRef.current?.scrollIntoView({ behavior: "smooth" });
        }
      }, 500);
    }
  };

  const getSessoesByFilme = async (idCinema: string, idFilme: string) => {
    setIdCinemaSelected(idCinema);

    const response = await SessoesActions.getSessoesByFilme(idFilme, idCinema);

    if (response) {
      setSessoesByFilmeData(response);
      setTimeout(() => {
        if (!sessoesIsInView) {
          sessoesDivRef.current?.scrollIntoView({ behavior: "smooth" });
        }
      }, 500);
    }
  };

  return (
    <>
      <FilmesCarousel
        slides={slides}
        callback={(idFilme, scroll) =>
          getSessoesDisponiveisByFilme(idFilme, scroll)
        }
      />
      {sessoesDisponeisData && (
        <>
          <div
            ref={ticketsDivRef}
            id="tickets"
            className="bg-muted h-auto p-5 pb-10 flex items-center justify-start flex-col"
          >
            {loading && <LoadingComponent />}
            {!loading && (
              <>
                <div className="w-full flex items-center space-x-2 my-5 mb-9">
                  <Store size={35} />
                  <HeadingCine
                    title="Selecione o cinema"
                    description="Abaixo os cinemas que possuem sessão com o filme selecionado em cartaz"
                  />
                </div>
                <div
                  className={`max-w-5xl grid gap-5 grid-cols-1 md:grid-cols-${
                    Object.keys(sessoesDisponeisData).length
                  }`}
                >
                  {Object.keys(sessoesDisponeisData).length === 0 && (
                    <NoData text="Não há sessões disponíveis para esse filme atualmente..." />
                  )}
                  {Object.entries(sessoesDisponeisData).map((cinema, index) => (
                    <Link
                      key={cinema[0]}
                      to="sessoesbyfilme"
                      spy={true}
                      smooth={true}
                      duration={500}
                      onClick={() =>
                        getSessoesByFilme(
                          cinema[1][0].idcinema,
                          idFilmeSelected!
                        )
                      }
                    >
                      <motion.div
                        variants={horizontalVariant}
                        transition={{
                          duration: 0.1,
                        }}
                        className={cn(
                          "text-white hover:-translate-y-2 flex-col transition-transform duration-300 cursor-pointer group relative h-80 w-64 bg-gradient-to-l from-card/70 to-card flex items-center justify-center rounded-xl shadow-lg dark:shadow-zinc-950 overflow-hidden",
                          idCinemaSelected === cinema[1][0].idcinema &&
                            "ring-2 ring-primary"
                        )}
                      >
                        <Popcorn
                          size={45}
                          className={cn(
                            "mx-auto my-5 group-hover:text-primary",
                            idCinemaSelected === cinema[1][0].idcinema &&
                              "text-primary"
                          )}
                        />
                        <h5
                          className={cn(
                            "inset-0 font-extrabold text-lg group-hover:text-primary",
                            idCinemaSelected === cinema[1][0].idcinema &&
                              "text-primary"
                          )}
                        >
                          {cinema[0]}
                        </h5>
                      </motion.div>
                    </Link>
                  ))}
                </div>
              </>
            )}
          </div>

          <div
            ref={sessoesDivRef}
            id="sessoesbyfilme"
            className={cn(
              "bg-card h-0 p-0 flex items-start overflow-auto justify-between flex-col",
              sessoesByFilmeData && "h-auto p-5 min-h-[500px]"
            )}
          >
            {sessoesByFilmeData && (
              <>
                <SessoesByFilme data={sessoesByFilmeData} />
                <div className="w-full mt-5 flex items-center  justify-center">
                  <Link
                    to="quadro"
                    spy={true}
                    smooth={true}
                    duration={500}
                    onClick={() => {
                      if (idCinemaSelected) {
                        getQuadroDeHorariosByCinema(idCinemaSelected);
                      }
                    }}
                  >
                    <Button>
                      <Calendar className="mr-2" /> Ver Quadro de Horários
                      Completo
                    </Button>
                  </Link>
                </div>
              </>
            )}
          </div>
          <div
            ref={quadroHorariosRef}
            id="quadro"
            className={cn(
              "bg-muted h-0 p-0 flex w-full items-start justify-start overflow-auto flex-col",
              quadroDeHorariosData && "h-auto p-5"
            )}
          >
            {quadroDeHorariosData && (
              <QuadroClient isCinema data={quadroDeHorariosData} />
            )}
          </div>
        </>
      )}
    </>
  );
}
