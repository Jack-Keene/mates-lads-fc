import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { getStats } from "../actions/statActions.js";
import Loader from "../components/Loader";
import { Container, FormSelect, Form } from "react-bootstrap";
import FantasyLeagueTable from "../components/fantasyLeagueTable.js";
import { listLeagues } from "../actions/leagueActions.js";

const FantasyLeagueScreen = () => {
  const dispatch = useDispatch();

  const [league, setLeague] = useState("All");

  const statList = useSelector((state) => state.statList);
  const { loading, error, stats } = statList;

  const leagueList = useSelector((state) => state.leagueList);
  const { loading: leaguesLoading, leagues } = leagueList;

  useEffect(() => {
    dispatch(getStats());
    dispatch(listLeagues());
  }, [dispatch]);

  return (
    <Container>
      {loading ? (
        <Loader />
      ) : error ? (
        <h1>Error</h1>
      ) : (
        <Container>
          <Link className='btn btn-light my-3' to='/players'>
            Back To Players
          </Link>
          {leaguesLoading ? (
            <Loader />
          ) : (
            <Form.Select
              type='select'
              placeholder='League'
              value={league}
              onChange={(e) => setLeague(e.target.value)}>
              <option>All</option>
              {leagues
                .filter((l) => l.isActive)
                .map((league) => (
                  <option key={league._id} value={league._id}>
                    {league.name} || {league.venue}
                  </option>
                ))}
            </Form.Select>
          )}
          <h1 className='blue pt-3 m-0'>
            <strong>Statistics</strong>
          </h1>
          {stats && <FantasyLeagueTable stats={stats} league={league} />}
        </Container>
      )}
    </Container>
  );
};

export default FantasyLeagueScreen;
