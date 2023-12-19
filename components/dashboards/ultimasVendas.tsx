import { UltimasVendas } from "@/actions/root/cinema/api";
import { Avatar, AvatarImage } from "../ui/avatar";
import { formatDistance, subHours } from "date-fns";
import { ptBR } from "date-fns/locale";
import { ChevronsUp } from "lucide-react";
import { currencyFormatter } from "@/lib/utils";
import NoGraphData from "../base/noGraphData";

interface UltimasVendasProps {
  data: UltimasVendas[];
}

export default function UltimasVendas(props: UltimasVendasProps) {
  const { data } = props;

  const sortedData =
    data.length &&
    data
      .sort((a, b) => {
        const dateA = new Date(a.datareserva);
        const dateB = new Date(b.datareserva);

        if (dateA < dateB) return 1;
        if (dateA > dateB) return -1;
        return 0;
      })
      .slice(0, 5);
  return (
    <div className="flex flex-col w-full h-full  bg-card rounded-xl shadow-lg">
      <h5 className="text-muted-foreground font-xs w-full font-semibold text-start tracking-tight p-5">
        Últimas vendas
      </h5>
      {!sortedData && <NoGraphData />}
      {sortedData &&
        sortedData.map((item) => (
          <div key={item.nomereserva} className="flex p-3 border-b">
            <Avatar>
              <Avatar>
                <AvatarImage
                  src={`https://api.multiavatar.com/${item.nomereserva}.svg`}
                  alt="avatarImage"
                />
              </Avatar>
            </Avatar>
            <span className="ml-3 flex flex-col gap-2">
              <h5 className="font-semibold text-sm">{item.nomereserva}</h5>
              <h5 className="text-muted-foreground text-xs">
                {item.nomecinema}
              </h5>
            </span>
            <span className="ml-auto flex flex-col text-end gap-2">
              <h5 className="text-muted-foreground text-xs">
                {formatDistance(
                  subHours(new Date(item.datareserva), 3),
                  new Date(),
                  {
                    addSuffix: true,
                    locale: ptBR,
                  }
                )}
              </h5>
              <span className="flex space-x-1 items-center justify-end">
                <ChevronsUp className="text-green-700" />
                <h5 className="text-green-700 text-sm font-semibold">
                  {currencyFormatter.format(item.valor)}
                </h5>
              </span>
            </span>
          </div>
        ))}
    </div>
  );
}
