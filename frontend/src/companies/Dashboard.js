import React, { useEffect } from "react";
import { Divider, Typography, Paper, Grid, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import BasicInfo from "./BasicInfo";
import LineChart from "./LineChart";
import Crazy from "./Crazy";
import { risk, cluster, selectprofile } from "./companiesSlice";
import {
  getWatchlist,
  putWatchlist,
  deleteWatchlist,
  selectWatchlist,
} from "../users/usersSlice";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { selectUser } from "../users/usersSlice";
import IncomeStatement from "./IncomeStatement";
import BalanceSheet from "./BalanceSheet";
import RatioSheet from "./RatioSheet";

const useStyles = makeStyles({
  div: { width: "100%", boxSizing: "border-box", padding: "2rem" },
  heading: { fontSize: "2.5rem" },
  subheading: { fontSize: "1.5rem" },
  button: { fontSize: "1rem", color: "primary" },
});

const Dashboard = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  let username = useSelector(selectUser);
  let watchlist = useSelector(selectWatchlist);
  let profile = useSelector(selectprofile);

  useEffect(() => {
    if (watchlist === null) {
      dispatch(getWatchlist({ username }));
    }
  });

  const onRemove = (dispatch, companyId, username) => {
    dispatch(deleteWatchlist({ username, companyId }))
      .unwrap()
      .then((data) => {
        if (data.res === -1) {
          console.log(data);
        } else {
          dispatch(getWatchlist({ username }));
        }
      });
  };
  const onAdd = (dispatch, companyId, username) => {
    dispatch(putWatchlist({ username, companyId }))
      .unwrap()
      .then((data) => {
        if (data.res === -1) {
          console.log(data);
        } else {
          dispatch(getWatchlist({ username }));
        }
      });
  };
  const onRisk = (dispatch, companyId, history) => {
    dispatch(risk({ id: companyId }));
    dispatch(cluster({ id: companyId }));
    history.push("/riskanalysis");
  };

  if (!profile.entid) {
    return <div />;
  }
  return (
    <div>
      <div className={classes.div}>
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <Typography className={classes.heading}>{profile.entid}</Typography>
            <Typography className={classes.subheading}>
              {"Type of Enterprise: " + profile.ENTTYPE}
            </Typography>
          </Grid>

          <Grid item xs={4} container justifyContent="flex-end">
            <Grid item xs={7}>
              {username ? (
                watchlist.find((company) => company.entid === profile.entid) ? (
                  <Button
                    variant="contained"
                    className={classes.button}
                    color="primary"
                    onClick={() =>
                      onRemove(dispatch, profile.entid.toString(), username)
                    }
                  >
                    Remove from watchlist
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    className={classes.button}
                    color="primary"
                    onClick={() =>
                      onAdd(dispatch, profile.entid.toString(), username)
                    }
                  >
                    Add to watchlist
                  </Button>
                )
              ) : (
                <Button
                  variant="contained"
                  className={classes.button}
                  color="primary"
                  disabled
                >
                  Add to watchlist
                </Button>
              )}
            </Grid>
            <Grid item xs={5}>
              <Button
                variant="contained"
                className={classes.button}
                color="primary"
                onClick={() =>
                  onRisk(dispatch, profile.entid.toString(), history)
                }
              >
                Risk Analysis
              </Button>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Divider />
          </Grid>

          <Grid
            item
            xs={12}
            md={7}
            container
            spacing={2}
            alignContent="flex-start"
          >
            <Grid item xs={12}>
              <Paper className={classes.div}>
                {profile.gross_profit ? (
                  <LineChart
                    title="Gross Profit"
                    labels={Object.keys(profile.gross_profit)}
                    label={["Gross Profit"]}
                    data={[Object.values(profile.gross_profit)]}
                  />
                ) : (
                  <Typography>
                    Gross Profit is not avaliable for this company
                  </Typography>
                )}
              </Paper>
            </Grid>

            <Grid item xs={12}>
              <Paper className={classes.div}>
                {profile.sales_expense ? (
                  <LineChart
                    title="OPEX (Operating Expenses)"
                    labels={Object.keys(profile.sales_expense)}
                    label={["OPEX"]}
                    data={[Object.values(profile.sales_expense)]}
                  />
                ) : (
                  <Typography>
                    OPEX (Operating Expenses) is not avaliable for this company
                  </Typography>
                )}
              </Paper>
            </Grid>

            <Grid item xs={12}>
              <Paper className={classes.div}>
                {profile.retained_profits ? (
                  <LineChart
                    title="Net Profit"
                    labels={Object.keys(profile.retained_profits)}
                    label={["Net Profit"]}
                    data={[Object.values(profile.retained_profits)]}
                  />
                ) : (
                  <Typography>
                    Net Profit is not avaliable for this company
                  </Typography>
                )}
              </Paper>
            </Grid>

            <Grid item xs={12}>
              <Paper className={classes.div}>
                {profile.LIAGRO && profile.TOTEQU ? (
                  <Crazy
                    title="Total Liabilities, Shareholder Equity"
                    type={["bar", "bar"]}
                    labels={Object.keys(profile.LIAGRO)}
                    label={["Total Liabilities", "Shareholder Equity"]}
                    data={[
                      Object.values(profile.LIAGRO),
                      Object.values(profile.TOTEQU),
                    ]}
                  />
                ) : (
                  <Typography>
                    Total Liabilities or Shareholder Equity is not avaliable for
                    this company
                  </Typography>
                )}
              </Paper>
            </Grid>

            <Grid item xs={12}>
              <Paper className={classes.div}>
                {profile.debtEquityRatio ? (
                  <LineChart
                    title="Debt Equity Ratio"
                    labels={Object.keys(profile.debtEquityRatio)}
                    label={["Debt Equity Ratio"]}
                    data={[Object.values(profile.debtEquityRatio)]}
                  />
                ) : (
                  <Typography>
                    Debt Equity Ratio is not avaliable for this company
                  </Typography>
                )}
              </Paper>
            </Grid>

            <Grid item xs={12}>
              <Paper className={classes.div}>
                {profile.returnOnEquity ? (
                  <LineChart
                    title="Return on Equity (ROE)"
                    labels={Object.keys(profile.returnOnEquity)}
                    label={["Return on Equity"]}
                    data={[Object.values(profile.returnOnEquity)]}
                  />
                ) : (
                  <Typography>ROE is not avaliable for this company</Typography>
                )}
              </Paper>
            </Grid>
          </Grid>

          <Grid
            item
            xs={8}
            md={5}
            container
            spacing={2}
            alignContent="flex-start"
          >
            <Grid item xs={12}>
              <Paper>
                <BasicInfo
                  entid={profile.entid}
                  ENTTYPE={profile.ENTTYPE}
                  INDUSTRYPHY={profile.INDUSTRYPHY}
                  REGCAPCUR={profile.REGCAPCUR}
                  REGCAP={profile.REGCAP}
                  PARNUM={profile.PARNUM}
                  LIMPARNUM={profile.LIMPARNUM}
                  PARFORM={profile.PARFORM}
                  EXENUM={profile.EXENUM}
                  EMPNUM={profile.EMPNUM}
                  tax_type={profile.tax_type}
                  tax_state={profile.tax_state}
                  region_id={profile.region_id}
                  industry_tax={profile.industry_tax}
                  registertype={profile.registertype}
                  economic_type={profile.economic_type}
                  incometax_rate={profile.incometax_rate}
                  collection_type={profile.collection_type}
                />
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper>
                <IncomeStatement
                  revenue={
                    profile.revenue[
                      Object.keys(profile.revenue)[
                        Object.keys(profile.revenue).length - 1
                      ]
                    ]
                  }
                  main_business_income={profile.main_business_income}
                  other_business_income={profile.other_business_income}
                  VENDINC={profile.VENDINC}
                  non_operating_income={profile.non_operating_income}
                  sales_cost={profile.sales_cost}
                  main_business_cost={profile.main_business_cost}
                  other_operating_cost={profile.other_operating_cost}
                  gross_profit={
                    profile.gross_profit[
                      Object.keys(profile.gross_profit)[
                        Object.keys(profile.gross_profit).length - 1
                      ]
                    ]
                  }
                  main_business_gross={profile.main_business_gross}
                  sales_expense={
                    profile.sales_expense[
                      Object.keys(profile.sales_expense)[
                        Object.keys(profile.sales_expense).length - 1
                      ]
                    ]
                  }
                  payrol_expense={profile.payrol_expense}
                  welfare_expenses={profile.welfare_expenses}
                  education_expenses={profile.education_expenses}
                  ad_expenses={profile.ad_expenses}
                  non_operating_expense={profile.non_operating_expense}
                  G_expense={profile.G_expense}
                  finance_expense={profile.finance_expense}
                  RATGRO={profile.RATGRO}
                  retained_profits={
                    profile.retained_profits[
                      Object.keys(profile.retained_profits)[
                        Object.keys(profile.retained_profits).length - 1
                      ]
                    ]
                  }
                />
              </Paper>
            </Grid>

            <Grid item xs={12}>
              <Paper>
                <BalanceSheet
                  ASSGRO={
                    profile.ASSGRO[
                      Object.keys(profile.ASSGRO)[
                        Object.keys(profile.ASSGRO).length - 1
                      ]
                    ]
                  }
                  LIAGRO={
                    profile.LIAGRO[
                      Object.keys(profile.LIAGRO)[
                        Object.keys(profile.LIAGRO).length - 1
                      ]
                    ]
                  }
                  TOTEQU={
                    profile.TOTEQU[
                      Object.keys(profile.TOTEQU)[
                        Object.keys(profile.TOTEQU).length - 1
                      ]
                    ]
                  }
                />
              </Paper>
            </Grid>

            <Grid item xs={12}>
              <Paper>
                <RatioSheet
                  debtEquityRatio={
                    profile.debtEquityRatio[
                      Object.keys(profile.debtEquityRatio)[
                        Object.keys(profile.debtEquityRatio).length - 1
                      ]
                    ]
                  }
                  returnOnEquity={profile.returnOnEquity}
                  returnOnAssets={profile.returnOnAssets}
                  grossProfitMargin={
                    profile.grossProfitMargin[
                      Object.keys(profile.grossProfitMargin)[
                        Object.keys(profile.grossProfitMargin).length - 1
                      ]
                    ]
                  }
                  opexRatio={
                    profile.opexRatio[
                      Object.keys(profile.opexRatio)[
                        Object.keys(profile.opexRatio).length - 1
                      ]
                    ]
                  }
                  netProfitMarginRatio={
                    profile.netProfitMarginRatio[
                      Object.keys(profile.netProfitMarginRatio)[
                        Object.keys(profile.netProfitMarginRatio).length - 1
                      ]
                    ]
                  }
                />
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default Dashboard;
