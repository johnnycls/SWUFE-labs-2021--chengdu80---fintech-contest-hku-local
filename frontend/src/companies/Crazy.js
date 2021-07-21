import { Typography } from "@material-ui/core";
import React from "react";
import { Bar } from "react-chartjs-2";
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
  "rgba(255, 159, 64, 1)",
];

const chartData = (labels, label, data, type) => {
  let datasets = [];
  for (let i = 0; i < label.length; i++) {
    datasets.push({
      type: type[i],
      label: label[i],
      data: data[i],
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
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
};

const Crazy = (props) => {
  const classes = useStyles();
  const { title, labels, label, data, type } = props;
  return (
    <>
      <Typography className={classes.title}>{title}</Typography>
      <Bar data={chartData(labels, label, data, type)} options={options} />
    </>
  );
};

export default Crazy;
