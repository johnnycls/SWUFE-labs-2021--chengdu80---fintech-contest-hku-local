import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Grid, Divider } from "@material-ui/core";

const useStyles = makeStyles({
  div: { width: "100%", boxSizing: "border-box", padding: "1rem" },
  heading: { fontSize: "1.5rem", variant: "h3", overflowWrap: "break-word" },
  subheading: { fontSize: "1rem", variant: "p", overflowWrap: "break-word" },
  button: { fontSize: "1rem", color: "primary" },
  divider: { marginBottom: 10 },
});

const BasicInfo = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.div}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Typography className={classes.heading}>Basic Infomation</Typography>
        </Grid>
        <Grid item xs={12}>
          <Divider className={classes.divider} />
        </Grid>
        <Grid item xs={9}>
          <Typography className={classes.subheading}>
            Enterprise’s ID
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography className={classes.subheading}>{props.entid}</Typography>
        </Grid>
        <Grid item xs={9}>
          <Typography className={classes.subheading}>
            Type of enterprise
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography className={classes.subheading}>
            {props.ENTTYPE}
          </Typography>
        </Grid>
        <Grid item xs={9}>
          <Typography className={classes.subheading}>
            Industry category of the company
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography className={classes.subheading}>
            {props.INDUSTRYPHY}
          </Typography>
        </Grid>
        <Grid item xs={9}>
          <Typography className={classes.subheading}>
            Enterprise's registered capital currency
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography className={classes.subheading}>
            {props.REGCAPCUR}
          </Typography>
        </Grid>
        <Grid item xs={9}>
          <Typography className={classes.subheading}>
            Enterprise's registered capital
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography className={classes.subheading}>{props.REGCAP}</Typography>
        </Grid>
        <Grid item xs={9}>
          <Typography className={classes.subheading}>
            Number of business partners
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography className={classes.subheading}>{props.PARNUM}</Typography>
        </Grid>
        <Grid item xs={9}>
          <Typography className={classes.subheading}>
            Number of limited partners of the business
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography className={classes.subheading}>
            {props.LIMPARNUM}
          </Typography>
        </Grid>
        <Grid item xs={9}>
          <Typography className={classes.subheading}>
            Corporate partnership
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography className={classes.subheading}>
            {props.PARFORM}
          </Typography>
        </Grid>
        <Grid item xs={9}>
          <Typography className={classes.subheading}>
            Number of executives in the enterprise
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography className={classes.subheading}>{props.EXENUM}</Typography>
        </Grid>
        <Grid item xs={9}>
          <Typography className={classes.subheading}>
            Number of employees
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography className={classes.subheading}>{props.EMPNUM}</Typography>
        </Grid>
        <Grid item xs={9}>
          <Typography className={classes.subheading}>Taxpayer type</Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography className={classes.subheading}>
            {props.tax_type}
          </Typography>
        </Grid>
        <Grid item xs={9}>
          <Typography className={classes.subheading}>
            Taxpayer status
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography className={classes.subheading}>
            {props.tax_state}
          </Typography>
        </Grid>
        <Grid item xs={9}>
          <Typography className={classes.subheading}>
            Region where the tax-paying company is located
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography className={classes.subheading}>
            {props.region_id}
          </Typography>
        </Grid>
        <Grid item xs={9}>
          <Typography className={classes.subheading}>
            Whether the taxpayer is an industrial enterprise
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography className={classes.subheading}>
            {props.industry_tax}
          </Typography>
        </Grid>
        <Grid item xs={9}>
          <Typography className={classes.subheading}>
            Tax-paying company registration type
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography className={classes.subheading}>
            {props.registertype}
          </Typography>
        </Grid>
        <Grid item xs={9}>
          <Typography className={classes.subheading}>
            Economic industry classification of tax-paying enterprises
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography className={classes.subheading}>
            {props.economic_type}
          </Typography>
        </Grid>
        <Grid item xs={9}>
          <Typography className={classes.subheading}>
            Tax rate applicable to corporate income tax for taxpayers
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography className={classes.subheading}>
            {props.incometax_rate}
          </Typography>
        </Grid>
        <Grid item xs={9}>
          <Typography className={classes.subheading}>
            Tax collection type
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography className={classes.subheading}>
            {props.collection_type}
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
};

export default BasicInfo;
