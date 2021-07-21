import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Grid } from "@material-ui/core";

const useStyles = makeStyles({
  div: { width: "100%", boxSizing: "border-box" },
  heading: { fontSize: "2rem", variant: "h5", marginBottom: 10 },
  subheading: {
    fontSize: "2rem",
    variant: "p",
    marginBottom: 10,
    fontWeight: "600",
    overflowWrap: "break-word",
  },
  divider: { marginBottom: 10 },
});

const RiskTypeCard = (props) => {
  const classes = useStyles();
  return (
    <div className={classes.div}>
      <Grid container>
        <Grid item xs={12}>
          <Typography className={classes.heading}>{props.title}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography className={classes.heading}>{props.data}</Typography>
        </Grid>
      </Grid>
    </div>
  );
};

export default RiskTypeCard;
