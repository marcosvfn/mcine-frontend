import { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

interface DashboardCardProps {
  icon: ReactNode;
  title: string;
  value: number;
  description: string;
}

export default function DashboardCard(props: DashboardCardProps) {
  const { icon, title, value, description } = props;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          {title}
          <span className="h-4 w-4 text-muted-foreground">{icon}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}
