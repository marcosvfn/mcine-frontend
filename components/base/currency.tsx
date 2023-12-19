import { currencyFormatter } from "@/lib/utils";

interface CurrencyProps {
  value: string | number;
}

export default function Currency(props: CurrencyProps) {
  const { value } = props;

  return (
    <div className="font-semibold">
      {currencyFormatter.format(Number(value))}
    </div>
  );
}
