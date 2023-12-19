import { SessoesFilmesInfo } from "@/actions/tenant/salas/api";
import FilmeSessaoCard from "@/components/base/filmeSessaoCard";
import NoData from "@/components/base/noData";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

interface QuadroPageProps {
  data: SessoesFilmesInfo[];
  value: string;
  isCinema: boolean;
}

export default function QuadroPage(props: QuadroPageProps) {
  const { data, value, isCinema } = props;

  const tabsValues: string[] = data
    .reduce((acc: string[], sessao) => {
      if (!acc.includes(sessao.dataSessao)) {
        acc.push(sessao.dataSessao);
      }
      return acc;
    }, [])
    .sort((a, b) => {
      const dateA = new Date(a);
      const dateB = new Date(b);
      return Number(dateA) - Number(dateB);
    });

  const groupedSessions: { [key: string]: SessoesFilmesInfo[] } = data.reduce(
    (
      acc: { [key: string]: SessoesFilmesInfo[] },
      sessao: SessoesFilmesInfo
    ) => {
      if (!acc[sessao.dataSessao]) {
        acc[sessao.dataSessao] = [];
      }
      acc[sessao.dataSessao].push(sessao);
      return acc;
    },
    {}
  );

  const [defaultValue, setDefaultValue] = useState(tabsValues[0]);

  return (
    <TabsContent value={value}>
      <Tabs
        defaultValue={defaultValue}
        className="w-full"
        value={defaultValue}
        onValueChange={(value) => setDefaultValue(value)}
      >
        <TabsList
          className={cn(
            "flex items-center justify-start bg-card w-full overflow-auto h-auto rounded-xl"
          )}
        >
          {tabsValues.length === 0 && (
            <NoData text="Não há sessões disponíveis no período informada para essa sala." />
          )}
          {tabsValues.map((tab, index) => (
            <TabsTrigger
              key={`${index}==${tab}`}
              value={tab}
              className="w-full h-12 rounded-xl data-[state=active]:bg-primary data-[state=active]:text-white max-w-[150px]"
            >
              {tab}
            </TabsTrigger>
          ))}
        </TabsList>
        {tabsValues.map((tab, index) => (
          <TabsContent
            key={`${index}--${tab}`}
            value={tab}
            className="border shadow-xl rounded-2xl p-3 gap-5 "
          >
            {groupedSessions[tab]
              .sort((a, b) => {
                const timeA = parseInt(a.horaInicio.replace(":", ""), 10);
                const timeB = parseInt(b.horaInicio.replace(":", ""), 10);
                return timeA - timeB;
              })
              .map((sessao) => (
                <div key={sessao.idSessao}>
                  <FilmeSessaoCard idSessao={sessao.idSessao} data={sessao} />
                  <Separator className="my-3 dark:bg-zinc-600" />
                </div>
              ))}
          </TabsContent>
        ))}
      </Tabs>
    </TabsContent>
  );
}
