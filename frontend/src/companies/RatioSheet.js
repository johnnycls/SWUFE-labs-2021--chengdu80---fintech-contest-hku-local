import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Grid, Divider } from "@material-ui/core";

const useStyles = makeStyles({
  div: { width: "100%", boxSizing: "border-box", padding: "1rem" },
  heading: { fontSize: "1.5rem", variant: "h5", marginBottom: 10 },
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
          <Typography className={classes.heading}>Ratio</Typography>
        </Grid>

        <Grid item xs={12}>
          <Divider className={classes.divider} />
        </Grid>

        <Grid item xs={7}>
          <Typography className={classes.normalText}>
            Debt-Equity Ratio
          </Typography>
        </Grid>
        <Grid item xs={5}>
          <Typography className={classes.normalText}>
            {props.debtEquityRatio}
          </Typography>
        </Grid>

        <Grid item xs={7}>
          <Typography className={classes.normalText}>
            Return on Equity (ROE)
          </Typography>
        </Grid>
        <Grid item xs={5}>
          <Typography className={classes.normalText}>
            {props.returnOnEquity}
          </Typography>
        </Grid>

        <Grid item xs={7}>
          <Typography className={classes.normalText}>
            Return on Assets (ROA)
          </Typography>
        </Grid>
        <Grid item xs={5}>
          <Typography className={classes.normalText}>
            {props.returnOnAssets}
          </Typography>
        </Grid>

        <Grid item xs={7}>
          <Typography className={classes.normalText}>
            Gross Profit Margin
          </Typography>
        </Grid>
        <Grid item xs={5}>
          <Typography className={classes.normalText}>
            {props.grossProfitMargin}
          </Typography>
        </Grid>

        <Grid item xs={7}>
          <Typography className={classes.normalText}>OPEX Ratio</Typography>
        </Grid>
        <Grid item xs={5}>
          <Typography className={classes.normalText}>
            {props.opexRatio}
          </Typography>
        </Grid>

        <Grid item xs={7}>
          <Typography className={classes.normalText}>
            Net Profit Margin Ratio
          </Typography>
        </Grid>
        <Grid item xs={5}>
          <Typography className={classes.normalText}>
            {props.netProfitMarginRatio}
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
};

export default BalanceSheet;
