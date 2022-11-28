/** Options Default */
import { DefaultTheme } from "styled-components";

export const options = {
  maintainAspectRatio: false,
  hover: {
    mode: null,
  },
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      enabled: false,
    },
  },
};

/** Helpers */
export function getDoughnutColor(
  value: number,
  index: number[],
  theme: DefaultTheme
): string[] {
  let bgColor = "";

  if (value > index[0]) {
    bgColor = theme.color.success["400"];
  } else if (value > index[1]) {
    bgColor = theme.color.secondary["400"];
  } else if (value > index[2]) {
    bgColor = theme.color.warning["400"];
  } else {
    bgColor = theme.color.error["400"];
  }

  return [bgColor, theme.color.grayscale["200"]];
}

/** Plugins */
//todo : Merge plugins with params
export const insideTextCircle = {
  id: "insideText",
  beforeDraw: function(chart) {
    let width = chart.width,
      height = chart.height,
      ctx = chart.ctx;

    let fontSize = "22";
    ctx.font = fontSize + "px sans-serif";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "#36506c";

    let text = chart.config._config.data.datasets[0].label,
      textX = Math.round((width - ctx.measureText(text).width) / 2),
      textY = height / 2;

    ctx.fillText(text, textX, textY);
  },
};

export const insideTextCounter = {
  id: "insideText",
  beforeDraw: function(chart) {
    let width = chart.width,
      ctx = chart.ctx;

    let fontSize = "22";
    ctx.fillStyle = "#36506c";
    ctx.font = fontSize + "px sans-serif";
    ctx.textBaseline = "middle";

    let text = chart.config._config.data.datasets[0].label,
      textX = Math.round((width - ctx.measureText(text).width) / 2),
      textY = (width + 15) / 2;

    ctx.fillText(text, textX, textY);
  },
};
