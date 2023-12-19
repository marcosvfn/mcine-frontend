"use client";

import { TotalArrecadadoAnoByCinema } from "@/actions/root/cinema/api";
import { currencyFormatter } from "@/lib/utils";
import { Theme } from "@nivo/core";
import { ResponsiveLine } from "@nivo/line";
import { useTheme } from "next-themes";
import NoGraphData from "../base/noGraphData";

interface LineChartsProps {
  title: string;
  data: TotalArrecadadoAnoByCinema[];
  onlyOneCinema?: boolean;
}

export default function LineChart(props: LineChartsProps) {
  const { data: dataSet, title, onlyOneCinema = false } = props;
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
        text: {
          fill: theme === "light" ? "#414040" : "#cec9ce",
          fontSize: 9,
        },
      },
    },
    grid: {
      line: {
        stroke: theme === "light" ? "#999999" : "#585757",
        strokeWidth: 0.5,
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
    legends: {
      text: {
        fill: theme === "light" ? "#414040" : "#cec9ce",
      },
    },
  };

  let AreaBaselineValue = Number.POSITIVE_INFINITY;
  if (dataSet) {
    dataSet[0]?.data.forEach((dataPoint) => {
      if (Number(dataPoint.y) < AreaBaselineValue) {
        AreaBaselineValue = Number(dataPoint.y);
      }
    });
  }

  return (
    <div className="w-full h-full min-h-[300px] flex items-center justify-start p-5 flex-col bg-card rounded-xl shadow-lg">
      <h5 className="text-muted-foreground font-xs w-full font-semibold text-start tracking-tight">
        {title}
      </h5>
      {!dataSet.length && <NoGraphData />}
      {dataSet.length > 0 && (
        <ResponsiveLine
          data={dataSet}
          theme={graphTheme}
          margin={{
            top: 20,
            right: onlyOneCinema ? 20 : 20,
            bottom: onlyOneCinema ? 20 : 70,
            left: 70,
          }}
          xScale={{ type: "point" }}
          yScale={{
            type: "linear",
            min: "auto",
            max: "auto",
            reverse: false,
          }}
          yFormat={(val) => currencyFormatter.format(Number(val))}
          axisTop={null}
          axisRight={null}
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            format: (value) => currencyFormatter.format(value),
          }}
          colors={({ id, data }) => {
            const color = dataSet.find((item) => item.id === id)?.data[0].color;
            return String(color);
          }}
          pointSize={10}
          pointColor={{ theme: "background" }}
          pointBorderWidth={2}
          pointBorderColor={{ from: "serieColor" }}
          pointLabelYOffset={0}
          enableArea
          areaOpacity={0.3}
          areaBaselineValue={AreaBaselineValue}
          useMesh
          legends={
            onlyOneCinema
              ? []
              : [
                  {
                    anchor: "bottom",
                    direction: "row",
                    justify: false,
                    translateX: 0,
                    translateY: 50,
                    itemsSpacing: 50,
                    itemDirection: "left-to-right",
                    itemWidth: 80,
                    itemHeight: 20,
                    itemOpacity: 0.75,
                    symbolSize: 12,
                    symbolShape: "circle",
                    symbolBorderColor: "rgba(0, 0, 0, .5)",
                  },
                ]
          }
        />
      )}
    </div>
  );
}
