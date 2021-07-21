import React from "react";
import { Bar } from "react-chartjs-2";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  title: { fontSize: "2rem" },
});

const color = [
  "rgba(255, 99, 132, 1)",
  "rgba(54, 162, 235, 1)",
  "rgba(255, 206, 86, 1)",
  "rgba(75, 192, 192, 1)",
  "rgba(153, 102, 255, 1)",
];

const chartData = (labels, label, data) => {
  let datasets = [];
  for (let i = 0; i < label.length; i++) {
    datasets.push({
      label: label[i],
      data: data[i],
      fill: false,
      backgroundColor: color[i],
      borderColor: color[i],
    });
  }
  return {
    labels,
    datasets,
  };
};

const options = {
  indexAxis: "y",
  // Elements options apply to all of the options unless overridden in a dataset
  // In this case, we are setting the border of each horizontal bar to be 2px wide
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  responsive: true,
  plugins: {
    legend: {
      position: "right",
    },
  },
};

const HorizontalBarChart = (props) => {
  const classes = useStyles();
  const { title, labels, label, data } = props;
  return (
    <>
      <Typography className={classes.title}>{title}</Typography>
      <Bar data={chartData(labels, label, data)} options={options} />
    </>
  );
};

export default HorizontalBarChart;
