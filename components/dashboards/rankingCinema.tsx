import { Trophy } from "lucide-react";

type InputDataType = {
  id: string;
  label: string;
  value: number;
  color: string;
};

interface RankingCinemaProps {
  data: InputDataType[];
  title: string;
}

export default function RankingCinema(props: RankingCinemaProps) {
  const { data, title } = props;

  const dataSorted = data.sort((a, b) => a.value + b.value).slice(0, 3);

  return (
    <div className="flex flex-col w-full h-auto  bg-card rounded-xl shadow-lg">
      <h5 className="text-muted-foreground font-xs w-full font-semibold text-start tracking-tight p-3">
        {title}
      </h5>
      {dataSorted.map((item, index) => (
        <div key={item.label} className="flex p-3 border-b">
          {index === 0 && <Trophy className="text-yellow-500" />}
          {index === 1 && <Trophy className="text-gray-400" />}
          {index === 2 && <Trophy className="text-amber-900" />}
          <h5 className="text-sm tracking-tight ml-4">{item.label}</h5>
          <h5 className="ml-auto text-xs text-muted-foreground">{`${item.value} Ingressos Vendidos`}</h5>
        </div>
      ))}
    </div>
  );
}
