import React, { useEffect } from "react";
import {
  Divider,
  Typography,
  Paper,
  Grid,
  Button,
  Box,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { selectCluster, selectprofile, selectrisk } from "./companiesSlice";
import {
  getWatchlist,
  putWatchlist,
  deleteWatchlist,
  selectWatchlist,
  selectUser,
} from "../users/usersSlice";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import RiskTypeCard from "./RiskTypeCard";
import CustomPaginationActionsTable from "./CustomPaginationActionsTable";
import HorizontalBarChart from "./HorizontalBar";

const useStyles = makeStyles({
  div: { width: "100%", boxSizing: "border-box", padding: "2rem" },
  heading: { fontSize: "2.5rem" },
  subheading: { fontSize: "1.5rem" },
  button: { fontSize: "1rem", color: "primary" },
});

const RiskAnalysisPage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  let username = useSelector(selectUser);
  let watchlist = useSelector(selectWatchlist);
  let profile = useSelector(selectprofile);
  let risk = useSelector(selectrisk);
  let cluster = useSelector(selectCluster);
  const risks = {
    0: "Operation Risk",
    1: "Legal Risk",
    2: "Loan Risk",
    3: "Other Risk",
    4: "No Risk",
  };
  console.log(risk);

  useEffect(() => {
    if (watchlist === null) {
      dispatch(getWatchlist({ username }));
    }
    if (risk === null) {
      dispatch(risk({ companyId: profile.entid }));
    }
    if (cluster === null) {
      dispatch(cluster({ id: profile.entid }));
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
  const onDashboard = (history) => {
    history.push("/dashboard");
  };

  if (!profile || !risk) {
    return <div />;
  }

  return (
    <div>
      <div className={classes.div}>
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <Typography className={classes.heading}>{profile.entid}</Typography>
            <Typography className={classes.heading}>
              {"Risk Type: " + risks[risk.CaseType]}
            </Typography>
          </Grid>
          <Grid item xs={4} container justifyContent="flex-end">
            <Grid item xs={7}>
              {username ? (
                !watchlist ||
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
                onClick={() => onDashboard(history)}
              >
                Dashboard
              </Button>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Grid item xs={12} container spacing={2} alignContent="flex-start">
            <Grid item xs={3}>
              <Paper className={classes.div}>
                {Object.keys(risk).length !== 0 ? (
                  <RiskTypeCard
                    title={risks[0]}
                    data={(risk.Probability[0] * 100).toString() + "%"}
                  />
                ) : (
                  <Typography>Data Not Avaliable</Typography>
                )}
              </Paper>
            </Grid>
            <Grid item xs={3}>
              <Paper className={classes.div}>
                {Object.keys(risk).length !== 0 ? (
                  <RiskTypeCard
                    title={risks[1]}
                    data={(risk.Probability[1] * 100).toString() + "%"}
                  />
                ) : (
                  <Typography>Data Not Avaliable</Typography>
                )}
              </Paper>
            </Grid>
            <Grid item xs={3}>
              <Paper className={classes.div}>
                {Object.keys(risk).length !== 0 ? (
                  <RiskTypeCard
                    title={risks[2]}
                    data={(risk.Probability[2] * 100).toString() + "%"}
                  />
                ) : (
                  <Typography>Data Not Avaliable</Typography>
                )}
              </Paper>
            </Grid>
            <Grid item xs={3}>
              <Paper className={classes.div}>
                {Object.keys(risk).length !== 0 ? (
                  <RiskTypeCard
                    title={risks[3]}
                    data={(risk.Probability[3] * 100).toString() + "%"}
                  />
                ) : (
                  <Typography>Data Not Avaliable</Typography>
                )}
              </Paper>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Paper className={classes.div}>
              {Object.keys(risk).length !== 0 ? (
                <HorizontalBarChart
                  title="Explainable AI"
                  labels={[Object.keys(risk.lime)]}
                  label={["Value"]}
                  data={[Object.values(risk.lime)]}
                />
              ) : (
                <Typography>Data Not Avaliable</Typography>
              )}
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <div>
              <Paper>
                <Box p={3}>
                  <Typography variant="h4">Relevant Company</Typography>
                  <Divider />
                  {Object.keys(cluster).length !== 0 ? (
                    <CustomPaginationActionsTable rows={cluster} />
                  ) : (
                    <Typography>No Relevant Company</Typography>
                  )}
                </Box>
              </Paper>
              <br />
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default RiskAnalysisPage;
