/* eslint-disable react-hooks/exhaustive-deps */
import { SessoesFilmesInfo } from "@/actions/tenant/salas/api";
import { SessaoByFilme } from "@/actions/tenant/sessoes/api";
import FilmeSessaoCard from "@/components/base/filmeSessaoCard";
import NoData from "@/components/base/noData";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { useEffect, useState } from "react";

interface dataPageProps {
  data: SessaoByFilme[];
  value: string;
}

export default function DataPage(props: dataPageProps) {
  const { data, value } = props;

  const extrairDatasUnicas = () => {
    return data.map((item) => item.data);
  };

  const tabsValues = extrairDatasUnicas();

  const [defaultActiveTab, setDefaultActiveTab] = useState(
    data.length > 0 ? tabsValues[0] : ""
  );

  useEffect(() => {
    if (data) {
      setDefaultActiveTab(tabsValues[0]);
    }
  }, [data]);

  return (
    <TabsContent value={value}>
      <Tabs
        defaultValue={defaultActiveTab}
        className="w-full"
        value={defaultActiveTab}
        onValueChange={(value) => setDefaultActiveTab(value)}
      >
        {!data.length && !tabsValues.length && (
          <NoData text="Não há sessões com esse filme para esse período" />
        )}
        {tabsValues.length > 0 && (
          <TabsList
            className={cn(
              `bg-muted flex justify-between rounded-xl overflow-auto`
            )}
          >
            <>
              {tabsValues.map((tab, index) => (
                <TabsTrigger
                  key={`${index}.-${tab}`}
                  value={tab}
                  className={cn(
                    "w-full flex gap-x-2 rounded-xl data-[state=active]:bg-primary data-[state=active]:text-white max-w-[150px]"
                  )}
                >
                  {tab}
                </TabsTrigger>
              ))}
            </>
          </TabsList>
        )}
        {data.length > 0 &&
          data.map((item, index) => (
            <TabsContent
              key={`${index}==-${item.data}`}
              value={item.data}
              className="border shadow-xl rounded-2xl p-3 gap-5 "
            >
              {item.sessoes
                .sort((a, b) => {
                  const timeA = parseInt(a.horaInicio.replace(":", ""), 10);
                  const timeB = parseInt(b.horaInicio.replace(":", ""), 10);
                  return timeA - timeB;
                })
                .map((sessao) => {
                  const formattedSessao: SessoesFilmesInfo = {
                    avaliacao: sessao.avaliacao,
                    capaUrl: sessao.capaUrl,
                    dataSessao: format(new Date(sessao.dtSessao), "dd/MM/yyyy"),
                    horaInicio: sessao.horaInicio,
                    idCinema: sessao.idCinema,
                    idFilme: sessao.idFilme,
                    idSessao: sessao.id,
                    nomeFilme: sessao.nomeFilme,
                    sinopse: "",
                    vlEntrada: sessao.vlEntrada,
                  };
                  return (
                    <div key={sessao.id}>
                      <FilmeSessaoCard
                        idSessao={sessao.id}
                        data={formattedSessao}
                        isSessao
                      />
                      <Separator className="my-3 dark:bg-zinc-600" />
                    </div>
                  );
                })}
            </TabsContent>
          ))}
      </Tabs>
    </TabsContent>
  );
}
