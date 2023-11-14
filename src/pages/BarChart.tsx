import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import HC_more from "highcharts/highcharts-more";
import HC_exporting from "highcharts/modules/exporting";

HC_more(Highcharts);
HC_exporting(Highcharts);

const options: Highcharts.Options = {
  colors: ["#7CC7E8", "#01579B"],
  chart: {
    type: "bar",
    borderRadius: 12,
    width: 528,
    height: 344,
    backgroundColor: "rgb(255, 255, 255, 0.8)",
  },
  exporting: {
    enabled: false,
  },
  title: {
    text: "연간 RCar 대여량",
    align: "center",
    style: {
      fontWeight: "Bold",
    },
  },
  xAxis: {
    categories: ["봄(3~5월)", "여름(6~8월)", "가을(9~11월)", "겨울(12~2월)"],
  },
  yAxis: {
    min: 0,
    title: {
      text: "대여량 (단위: 대)",
    },
    labels: {
      overflow: "justify",
    },
    gridLineWidth: 0,
  },
  tooltip: {
    valueSuffix: "대",
  },
  plotOptions: {
    bar: {
      borderRadius: "50%",
      dataLabels: {
        enabled: true,
      },
      groupPadding: 0.1,
    },
  },
  legend: {
    layout: "vertical",
    align: "right",
    verticalAlign: "top",
    x: -40,
    y: 80,
    floating: true,
    borderWidth: 1,
    backgroundColor: "#ffffff",
    shadow: true,
  },
  credits: {
    enabled: false,
  },
  series: [
    {
      type: "bar",
      name: "경형차",
      color: "#7CC7E8",
      data: [631, 727, 1202, 721],
    },
    {
      type: "bar",
      name: "소형차",
      color: "#01579B",
      data: [814, 841, 1014, 726],
    },
    {
      type: "bar",
      name: "대형차",
      color: "#F2D091",
      data: [1076, 1007, 1561, 746],
    },
  ],
};

const BarChart: React.FC = () => {
  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default BarChart;
