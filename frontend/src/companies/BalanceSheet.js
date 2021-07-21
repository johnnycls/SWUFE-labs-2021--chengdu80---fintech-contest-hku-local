import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Grid, Divider } from "@material-ui/core";

const useStyles = makeStyles({
  div: { width: "100%", boxSizing: "border-box", padding: "1rem" },
  heading: { fontSize: "1.5rem", variant: "h4", marginBottom: 10 },
  subheading: {
    fontSize: "1rem",
    variant: "p",
    marginBottom: 10,
    fontWeight: "600",
    overflowWrap: "break-word",
  },
  normalText: {
    fontSize: "1rem",
    variant: "p",
    marginBottom: 10,
    fontWeight: "400",
    overflowWrap: "break-word",
  },
  button: { fontSize: "1rem", color: "primary" },
  divider: { marginBottom: 10 },
});

const BalanceSheet = (props) => {
  const classes = useStyles();
  return (
    <div className={classes.div}>
      <Grid container>
        <Grid item xs={12}>
          <Typography className={classes.heading}>Balance Sheet</Typography>
        </Grid>

        <Grid item xs={12}>
          <Divider className={classes.divider} />
        </Grid>

        <Grid item xs={8}>
          <Typography className={classes.normalText}>TOTAL ASSETS</Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography className={classes.normalText}>{props.ASSGRO}</Typography>
        </Grid>

        <Grid item xs={8}>
          <Typography className={classes.normalText}>
            TOTAL LIABILITIES
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography className={classes.normalText}>{props.LIAGRO}</Typography>
        </Grid>

        <Grid item xs={8}>
          <Typography className={classes.normalText}>
            SHAREHOLDER EQUITY
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography className={classes.normalText}>{props.TOTEQU}</Typography>
        </Grid>
      </Grid>
    </div>
  );
};

export default BalanceSheet;
