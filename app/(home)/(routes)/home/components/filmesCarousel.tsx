/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { FilmeModel } from "@/actions/root/filmes/api";
import { Button } from "@/components/ui/button";
import { PlayCircle, Ticket } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import MaisInformacoes from "./maisInformacoes";
import { cn } from "@/lib/utils";
import { Link as LinkScroll } from "react-scroll";
import { opacityVariant } from "@/components/animate/Variants";
import { motion } from "framer-motion";
import LoadingComponent from "@/components/base/loadingComponent";
import Link from "next/link";
import { Carousel } from "antd";
import { CarouselRef } from "antd/es/carousel";
import { PulseLoader } from "react-spinners";

interface FilmesCarouselProps {
  slides: FilmeModel[];
  callback: (idFilme: string, scroll: boolean) => void;
}

export default function FilmesCarousel(props: FilmesCarouselProps) {
  const { slides, callback } = props;

  const ref = useRef<CarouselRef>(null);

  const [isMounted, setIsMounted] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => setIsMounted(true), []);

  useEffect(() => {
    if (activeSlide) {
      callback(slides[activeSlide + 1].id, false);
    }
  }, [activeSlide]);

  if (!isMounted)
    return (
      <div className="min-h-[95vh] w-full flex items-center justify-center">
        <PulseLoader color="#9d1d2c" />
      </div>
    );

  return (
    <>
      <motion.div
        variants={opacityVariant}
        animate="animate"
        initial="initial"
        transition={{
          duration: 1.5,
          delay: 0,
        }}
        className="flex flex-col w-full items-center p-8 min-h-screen bg-cover bg-center md:bg-top"
        style={{
          backgroundImage: `url(https://res.cloudinary.com/dpmbuqjqj/image/upload/v1702754657/273516-disused-cinema_rdktdf.jpg)`,
        }}
      >
        <motion.div
          variants={opacityVariant}
          animate="animate"
          initial="initial"
          transition={{
            duration: 1.5,
            delay: 1.5,
          }}
          className="w-full max-w-2xl relative overflow-auto"
        >
          <div className="w-full h-20 rounded-xl flex items-center justify-center mb-5">
            <h1 className="font-bold  uppercase text-3xl tracking-tight">
              Filmes em cartaz
            </h1>
          </div>
          <Carousel
            ref={ref}
            dots={false}
            slidesToShow={3}
            infinite
            draggable
            // autoplay={true}
            // autoplaySpeed={50}
            // speed={1000}
            // pauseOnFocus={true}
            // waitForAnimate
            // pauseOnHover={true}
            slidesToScroll={1}
            style={{
              width: "100%",
              height: "100%",
              padding: "20px 0px",
            }}
          >
            {slides.map((s, index) => (
              <div key={`${index}==${s.id}`} className="py-5">
                <div
                  key={`${index}==${s.id}`}
                  className={cn(
                    `w-auto h-44 xs:h-52 sm:h-60 md:h-72 transform transition-all rounded-xl overflow-hidden duration-750 relative  dark:shadow-zinc-950  cursor-pointer shadow-lg
                  `,
                    activeSlide === index - 1 &&
                      "ring-4 ring-primary scale-110 z-50"
                  )}
                  onClick={() => {
                    setActiveSlide(index - 1);
                    ref.current?.goTo(index - 1);
                  }}
                >
                  <Image
                    key={`${index}==${s.id}`}
                    src={s.capaUrl}
                    alt="carouselImage"
                    fill
                    priority
                    className="object-cover"
                  />
                </div>
              </div>
            ))}
          </Carousel>

          <div className="mb-10 flex justify-center transition-all durantion-700 gap-3 w-full">
            {slides.map((s, i) => (
              <div
                onClick={() => {
                  setActiveSlide(i - 1);
                  ref.current?.goTo(i - 1);
                }}
                key={"circle" + i}
                className={`rounded-full w-3 h-3 cursor-pointer ${
                  i === activeSlide + 1
                    ? "bg-primary"
                    : "bg-zinc-400 dark:bg-muted"
                }`}
              ></div>
            ))}
          </div>
          <div className="transition mt-7 w-full px-6 ">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-6 justify-center">
              <Link
                href={slides[activeSlide + 1].linkTrailer}
                target="_blank"
                className="flex md:justify-end md:items-end md:w-auto w-full"
              >
                <Button className="flex gap-x-2 rounded-full md:w-auto w-full">
                  <PlayCircle />
                  Trailer
                </Button>
              </Link>
              <MaisInformacoes
                data={slides[activeSlide + 1]}
                callback={(idFilme) => callback(idFilme, true)}
              />
              <LinkScroll
                to="tickets"
                spy={true}
                smooth={true}
                duration={500}
                onClick={() => callback(slides[activeSlide + 1].id, true)}
              >
                <Button className="flex gap-x-2 rounded-full md:w-auto w-full">
                  <Ticket />
                  Tickets
                </Button>
              </LinkScroll>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </>
  );
}
