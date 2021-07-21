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

const IncomeStatement = (props) => {
  const classes = useStyles();
  return (
    <div className={classes.div}>
      <Grid container>
        <Grid item xs={12}>
          <Typography className={classes.heading}>Income Statement</Typography>
        </Grid>

        <Grid item xs={12}>
          <Divider className={classes.divider} />
        </Grid>

        <Grid item xs={8}>
          <Typography className={classes.subheading}>Revenue</Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography className={classes.subheading}>
            {props.revenue}
          </Typography>
        </Grid>
        <Grid item xs={8}>
          <Typography className={classes.normalText}>
            {"  Operating Income"}
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography className={classes.normalText}>
            {props.main_business_income}
          </Typography>
        </Grid>
        <Grid item xs={8}>
          <Typography className={classes.normalText}>
            {"    Main Business Income"}
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography className={classes.normalText}>
            {props.other_business_income}
          </Typography>
        </Grid>
        <Grid item xs={8}>
          <Typography className={classes.normalText}>
            {"    Other business income"}
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography className={classes.normalText}>
            {props.VENDINC}
          </Typography>
        </Grid>
        <Grid item xs={8}>
          <Typography className={classes.normalText}>
            {"  Non-operating Income"}
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography className={classes.normalText}>
            {props.non_operating_income}
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <Divider className={classes.divider} />
        </Grid>

        <Grid item xs={8}>
          <Typography className={classes.subheading}>Cost</Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography className={classes.subheading}>
            {props.sales_cost}
          </Typography>
        </Grid>
        <Grid item xs={8}>
          <Typography className={classes.normalText}>
            {"  Main Business Cost"}
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography className={classes.normalText}>
            {props.main_business_cost}
          </Typography>
        </Grid>
        <Grid item xs={8}>
          <Typography className={classes.normalText}>
            {"  Other Business Costs"}
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography className={classes.normalText}>
            {props.other_operating_cost}
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <Divider className={classes.divider} />
        </Grid>

        <Grid item xs={8}>
          <Typography className={classes.subheading}>Gross Profit</Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography className={classes.subheading}>
            {props.gross_profit}
          </Typography>
        </Grid>
        <Grid item xs={8}>
          <Typography className={classes.normalText}>
            {"  Gross Profit of the Company’s Main Business"}
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography className={classes.normalText}>
            {props.main_business_gross}
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <Divider className={classes.divider} />
        </Grid>

        <Grid item xs={8}>
          <Typography className={classes.subheading}>
            OPEX (Operating Expenses)
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography className={classes.subheading}>
            {props.sales_expense}
          </Typography>
        </Grid>
        <Grid item xs={8}>
          <Typography className={classes.normalText}>
            {"  Wages and Salaries"}
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography className={classes.normalText}>
            {props.payrol_expense}
          </Typography>
        </Grid>
        <Grid item xs={8}>
          <Typography className={classes.normalText}>
            {"  Welfare Expenses"}
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography className={classes.normalText}>
            {props.welfare_expenses}
          </Typography>
        </Grid>
        <Grid item xs={8}>
          <Typography className={classes.normalText}>
            {"  Education Expenditure"}
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography className={classes.normalText}>
            {props.education_expenses}
          </Typography>
        </Grid>
        <Grid item xs={8}>
          <Typography className={classes.normalText}>
            {"  Advertising Expenses"}
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography className={classes.normalText}>
            {props.ad_expenses}
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <Divider className={classes.divider} />
        </Grid>

        <Grid item xs={8}>
          <Typography className={classes.subheading}>
            Non-operating Expenses
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography className={classes.subheading}>
            {props.non_operating_expense}
          </Typography>
        </Grid>
        <Grid item xs={8}>
          <Typography className={classes.normalText}>
            {"  Management Expenses"}
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography className={classes.normalText}>
            {props.G_expense}
          </Typography>
        </Grid>
        <Grid item xs={8}>
          <Typography className={classes.normalText}>
            {"  Financial Expenses"}
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography className={classes.normalText}>
            {props.finance_expense}
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <Divider className={classes.divider} />
        </Grid>

        <Grid item xs={8}>
          <Typography className={classes.subheading}>total tax</Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography className={classes.subheading}>{props.RATGRO}</Typography>
        </Grid>
        <Grid item xs={8}>
          <Typography className={classes.subheading}>Net Profit</Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography className={classes.subheading}>
            {props.retained_profits}
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
};

export default IncomeStatement;
