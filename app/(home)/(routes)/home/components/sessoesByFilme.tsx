/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { SessoesByFilme } from "@/actions/tenant/sessoes/api";
import HeadingCine from "@/components/base/headingCine";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { Popcorn } from "lucide-react";
import DataPage from "./dataPage";
import { useEffect, useState } from "react";

interface SessoesByFilmeProps {
  data: SessoesByFilme;
}

export default function SessoesByFilme(props: SessoesByFilmeProps) {
  const { data } = props;

  const tabsValues = ["Sessões Passadas", "Próximas Sessões"];
  const [defaultActiveTab, setDefaultActiveTab] = useState(
    data.SessoesFuturas.length > 0 ? tabsValues[1] : tabsValues[0]
  );

  useEffect(() => {
    if (data) {
      const activeTab =
        data.SessoesFuturas.length > 0 ? tabsValues[1] : tabsValues[0];
      setDefaultActiveTab(
        data.SessoesFuturas.length > 0 ? tabsValues[1] : tabsValues[0]
      );
    }
  }, [data]);

  return (
    <div className="flex flex-col items-start w-full justify-start gap-5">
      <span className="flex items-center gap-3">
        <Popcorn size={35} />
        <HeadingCine
          title={`Sessões`}
          description="Visualize as sessões e horários do filme selecionado"
        />
      </span>
      <Tabs
        value={defaultActiveTab}
        onValueChange={(value) => setDefaultActiveTab(value)}
        defaultValue={defaultActiveTab}
        className="w-full"
      >
        <TabsList
          className={cn(
            `bg-muted flex justify-between rounded-xl overflow-auto`
          )}
        >
          {tabsValues.map((tab, index) => (
            <TabsTrigger
              key={`${index}.-${tab}`}
              value={tab}
              className={cn(
                "w-full flex gap-x-2 rounded-xl data-[state=active]:bg-primary data-[state=active]:text-white"
              )}
            >
              {tab}
            </TabsTrigger>
          ))}
        </TabsList>
        <DataPage data={data["SessoesPassadas"]} value={tabsValues[0]} />
        <DataPage data={data["SessoesFuturas"]} value={tabsValues[1]} />
      </Tabs>
    </div>
  );
}
