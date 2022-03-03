import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listLeagues } from "../actions/leagueActions";
import Loader from "../components/Loader";
import Leagues from "../components/Leagues";
import { Container } from "react-bootstrap";

const LeaguesScreen = () => {
  const dispatch = useDispatch();

  const leagueList = useSelector((state) => state.leagueList);
  const { loading, error, leagues } = leagueList;

  useEffect(() => {
    dispatch(listLeagues());
  }, [dispatch]);
  return (
    <Container>
      <h1 className='blue pt-3 m-0'>
        <strong>Current Leagues</strong>
      </h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <h1>Error</h1>
      ) : (
        <Leagues leagues={leagues && leagues.filter((l) => l.isActive)} />
      )}
      <h1 className='blue pt-3 m-0'>
        <strong>Past Leagues</strong>
      </h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <h1>Error</h1>
      ) : (
        <Leagues leagues={leagues && leagues.filter((l) => !l.isActive)} />
      )}
    </Container>
  );
};

export default LeaguesScreen;
