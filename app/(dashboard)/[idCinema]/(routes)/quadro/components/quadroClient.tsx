"use client";

import { QuadroDeHorariosType } from "@/actions/tenant/salas/api";
import Heading from "@/components/base/heading";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarCheck, CalendarIcon } from "lucide-react";
import QuadroPage from "./quadroPage";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { addDays, format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useState } from "react";
import { DateRange } from "react-day-picker";
import HeadingCine from "@/components/base/headingCine";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Rating from "@/components/base/rating";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface QuadroClientProps {
  data: QuadroDeHorariosType[];
  isCinema?: boolean;
}

export default function QuadroClient(props: QuadroClientProps) {
  const { data, isCinema = false } = props;
  const tabsValues = data.map((sala) => sala.nome);

  const [avaliacao, setAvaliacao] = useState<number>(99);
  const [horario, setHorario] = useState<string>("Todos");
  const [searchFilme, setSearchFilme] = useState<string>();

  const [date, setDate] = useState<DateRange | undefined>({
    from: addDays(new Date(), -20),
    to: addDays(new Date(), 20),
  });

  const dataFiltered = data.map((sala) => {
    const sessoesFiltradas = sala.sessoes.filter((sessao) => {
      const dataSessao = new Date(
        sessao.dataSessao.split("/").reverse().join("/")
      );

      const avaliacaoPass =
        !avaliacao || avaliacao === 99 || sessao.avaliacao === avaliacao;

      const horarioPass =
        !horario || horario === "Todos" || sessao.horaInicio === horario;

      const dataSessaoPass =
        dataSessao >= new Date(String(date?.from)) &&
        dataSessao <= new Date(String(date?.to));

      const nomeFilmePass =
        !searchFilme ||
        sessao.nomeFilme.toLowerCase().includes(searchFilme.toLowerCase());

      return avaliacaoPass && horarioPass && dataSessaoPass && nomeFilmePass;
    });

    return {
      ...sala,
      sessoes: sessoesFiltradas,
    };
  });

  const [defaultValue, setDefaultValue] = useState(tabsValues[0]);

  return (
    <>
      <div
        className={cn("flex items-center justify-between w-full overflow-auto")}
      >
        <span className="flex items-center gap-3">
          <CalendarCheck size={isCinema ? 35 : 40} />
          {isCinema && (
            <HeadingCine
              title={`Quadro de Horários`}
              description="Visualize as sessões de cada sala agrupadas por data no período selecionado"
            />
          )}
          {!isCinema && (
            <Heading
              title={`Quadro de Horários`}
              description="Visualize as sessões de cada sala agrupadas por data no período selecionado"
            />
          )}
        </span>
      </div>
      <Separator
        className={cn("block dark:bg-zinc-600", isCinema && "hidden")}
      />
      <div
        className={cn(
          "gap-3 flex lg:flex-row lg:items-center flex-col items-start pt-5 w-full   mb-5 "
        )}
      >
        <span className="flex flex-col gap-2 lg:w-auto w-full">
          <Label htmlFor="avaliacaoselect">Período</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="date"
                variant={"outline"}
                className={cn(
                  "w-full lg:w-[325px] justify-start text-left font-normal dark:hover:bg-card/70",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date?.from ? (
                  date.to ? (
                    <>
                      {format(date.from, "LLLLLLLLLLL dd, y", { locale: ptBR })}{" "}
                      - {format(date.to, "LLLLLLLLLLL dd, y", { locale: ptBR })}
                    </>
                  ) : (
                    format(date.from, "LLL dd, y")
                  )
                ) : (
                  <span>Pick a date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                locale={ptBR}
                initialFocus
                mode="range"
                fromYear={2023}
                defaultMonth={date?.from}
                selected={date}
                onSelect={setDate}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>
        </span>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 lg:w-auto w-full items-end">
          <span className="flex flex-col gap-2 lg:w-auto w-full">
            <Label htmlFor="avaliacaoselect">Avaliação</Label>
            <Select
              onValueChange={(value) => setAvaliacao(Number(value))}
              defaultValue={String(avaliacao)}
            >
              <SelectTrigger className="w-full lg:w-48" id="avaliacaoselect">
                <SelectValue
                  placeholder="Selecione a nota..."
                  className=" mb-5"
                >
                  {avaliacao !== 99 && (
                    <Rating
                      idFilme={""}
                      initialNota={avaliacao || 5}
                      readonly={true}
                    />
                  )}

                  {avaliacao === 99 && <>Todas as notas</>}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {[1, 2, 3, 4, 5, 99].map((aval, index) => (
                  <>
                    {aval !== 99 && (
                      <SelectItem
                        key={`aval${aval}--${index}`}
                        value={String(aval)}
                      >
                        <Rating idFilme="" initialNota={aval} readonly />
                      </SelectItem>
                    )}
                    {aval === 99 && (
                      <SelectItem
                        key={`${aval}=--${index}`}
                        value={String(aval)}
                      >
                        Todas as notas
                      </SelectItem>
                    )}
                  </>
                ))}
              </SelectContent>
            </Select>
          </span>

          <span className="flex flex-col gap-2  lg:w-auto w-full">
            <Label htmlFor="avaliacaoselect">Horário</Label>
            <Select
              onValueChange={(value) => setHorario(value)}
              defaultValue={horario}
            >
              <SelectTrigger className="w-full lg:w-48">
                <SelectValue placeholder="Selecione o horário..." />
              </SelectTrigger>
              <SelectContent>
                {["16:00", "18:00", "20:00", "22:00", "Todos"].map(
                  (hora, index) => (
                    <SelectItem key={`${index}..hora${hora}`} value={hora}>
                      {hora !== "Todos" ? `${hora}h` : hora}
                    </SelectItem>
                  )
                )}
              </SelectContent>
            </Select>
          </span>

          <span className="flex flex-col gap-2  lg:w-auto w-full">
            <Label htmlFor="searchFilme">Nome do filme</Label>
            <Input
              id="searchFilme"
              value={searchFilme}
              onChange={(e) => setSearchFilme(e.target.value)}
              className="w-full lg:w-48"
            />
          </span>
        </div>
      </div>
      <Tabs
        defaultValue={defaultValue}
        className="w-full"
        value={defaultValue}
        onValueChange={(value) => setDefaultValue(value)}
      >
        <TabsList
          className={cn(
            `flex justify-between rounded-xl overflow-auto bg-card`
          )}
        >
          {tabsValues.map((tab, index) => (
            <TabsTrigger
              key={`${index}.-${tab}`}
              value={tab}
              className={cn(
                "w-full flex gap-x-2 rounded-xl data-[state=active]:bg-primary overflow-auto data-[state=active]:text-white"
              )}
            >
              {tab}
            </TabsTrigger>
          ))}
        </TabsList>
        {dataFiltered.length > 0 &&
          data.map((sala, index) => {
            const salasFiltradas = dataFiltered.find(
              (item) => item.nome === sala.nome
            );
            return (
              <QuadroPage
                key={`${index}==${sala.nome}`}
                data={salasFiltradas ? salasFiltradas.sessoes : []}
                value={sala.nome}
                isCinema={isCinema}
              />
            );
          })}
      </Tabs>
    </>
  );
}
