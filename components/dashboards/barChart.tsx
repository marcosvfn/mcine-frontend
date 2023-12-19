"use client";

import { currencyFormatter } from "@/lib/utils";
import { Theme } from "@nivo/core";
import { useTheme } from "next-themes";
import { BarTooltip, BarTooltipProps, ResponsiveBar } from "@nivo/bar";
import NoGraphData from "../base/noGraphData";

interface BarChartProps {
  data: any[];
  keys: string[];
  indexBy: string;
  title: string;
}

type LocalDataType = {
  indexby: string;
  color: string;
};

function CustomBarTooltip<RawDatum>(props: BarTooltipProps<RawDatum>) {
  const { data, value, color, label } = props;

  const newData = data as LocalDataType;

  const newLabel = newData.indexby;

  return (
    <BarTooltip
      id={value}
      value={value}
      color={color}
      label={newLabel}
      formattedValue={currencyFormatter.format(value)}
      hidden={false}
      index={0}
      indexValue={newLabel}
      data={data}
    />
  );
}

export default function BarChart(props: BarChartProps) {
  const { data, indexBy, keys, title } = props;
  const { theme } = useTheme();

  const graphTheme: Theme = {
    axis: {
      legend: {
        text: {
          fill: theme === "light" ? "#414040" : "#cec9ce",
          fontSize: 14,
          fontWeight: "bold",
        },
      },
      ticks: {
        line: {
          stroke: "#fff",
        },
        text: {
          fill: theme === "light" ? "#414040" : "#cec9ce",
        },
      },
    },
    labels: {
      text: {
        fill: "#black",
      },
    },
    legends: {
      text: {
        fill: theme === "light" ? "#414040" : "#cec9ce",
      },
    },
    tooltip: {
      basic: {
        backgroundColor: theme === "light" ? "#fff" : "#414040",
      },
      container: {
        borderRadius: "5px",
        backgroundColor: theme === "light" ? "#fff" : "#414040",
      },
    },
    grid: {
      line: {
        stroke: theme === "light" ? "#999999" : "#585757",
        strokeWidth: 0.5,
      },
    },
  };

  return (
    <div className="w-full h-full flex items-center justify-start flex-col p-5 bg-card rounded-xl shadow-lg min-h-[400px]">
      <h5 className="text-muted-foreground font-xs w-full font-semibold text-start tracking-tight px">
        {title}
      </h5>
      {!data.length && <NoGraphData />}
      {data.length > 0 && (
        <ResponsiveBar
          data={data}
          theme={graphTheme}
          keys={keys}
          colorBy="indexValue"
          colors={({ id, data }) => data["color"]}
          indexBy={indexBy}
          margin={{
            top: 20,
            right: 0,
            bottom: 10,
            left: 70,
          }}
          enableGridX={false}
          enableGridY={true}
          padding={0.4}
          valueScale={{ type: "linear" }}
          valueFormat={(value: number) => currencyFormatter.format(value)}
          borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
          animate
          labelFormat="0.2s"
          enableLabel={false}
          axisTop={null}
          axisRight={null}
          axisLeft={{
            tickPadding: 5,
            tickSize: 1,
            format: (value) => currencyFormatter.format(value),
          }}
          axisBottom={null}
          tooltip={CustomBarTooltip}
          isInteractive
        />
      )}
    </div>
  );
}
