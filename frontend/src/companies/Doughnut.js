import React from "react";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Doughnut } from "react-chartjs-2";

const useStyles = makeStyles({
  title: { fontSize: "2rem" },
});

const chartData = (labels, label, data) => ({
  labels,
  datasets: [
    {
      label,
      data,
      backgroundColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)",
      ],
      borderWidth: 1,
    },
  ],
});

const DoughnutChart = (props) => {
  const classes = useStyles();
  const { labels, label, data } = props;
  return (
    <>
      <Typography className={classes.title}>Doughnut</Typography>
      <Doughnut data={chartData(labels, label, data)} />
    </>
  );
};

export default DoughnutChart;
