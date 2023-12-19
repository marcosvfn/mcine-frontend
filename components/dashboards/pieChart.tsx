"use client";
import { Theme } from "@nivo/core";
import { ResponsivePie } from "@nivo/pie";
import { useTheme } from "next-themes";
import NoGraphData from "../base/noGraphData";

interface VisualizacoesPieProps {
  data: any[];
  title: string;
}

export default function VisualizacoesPieChart(props: VisualizacoesPieProps) {
  const { data, title } = props;
  const { theme } = useTheme();

  const graphTheme: Theme = {
    legends: {
      text: {
        fill: theme === "light" ? "#414040" : "#cec9ce",
      },
    },
    labels: {
      text: {
        fill: "#fff",
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
  };

  return (
    <div className="w-full h-full min-h-[300px] flex items-center justify-star flex-col p-5 bg-card rounded-xl shadow-lg">
      <h5 className="text-muted-foreground font-xs w-full font-semibold text-start tracking-tight">
        {title}
      </h5>
      {!data.length && <NoGraphData />}
      {data.length > 0 && (
        <ResponsivePie
          theme={graphTheme}
          data={data}
          margin={{ top: 20, right: 20, bottom: 70, left: 20 }}
          innerRadius={0.5}
          padAngle={0.7}
          cornerRadius={3}
          activeOuterRadiusOffset={8}
          borderWidth={1}
          colors={({ id, data }) => data["color"]}
          enableArcLinkLabels={false}
          arcLabelsTextColor={"#fff"}
          borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
          defs={[
            {
              id: "dots",
              type: "patternDots",
              background: "inherit",
              color: "rgba(255, 255, 255, 0.3)",
              size: 4,
              padding: 1,
              stagger: true,
            },
            {
              id: "lines",
              type: "patternLines",
              background: "inherit",
              color: "rgba(255, 255, 255, 0.3)",
              rotation: -45,
              lineWidth: 6,
              spacing: 10,
            },
          ]}
          legends={[
            {
              anchor: "bottom-left",
              direction: "column",
              justify: false,
              translateX: 0,
              translateY: 65,
              itemsSpacing: 3,
              itemWidth: 100,
              itemHeight: 18,
              itemDirection: "left-to-right",
              itemOpacity: 1,
              symbolSize: 10,
              symbolShape: "circle",
            },
          ]}
        />
      )}
    </div>
  );
}
