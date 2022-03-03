import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { listLeagueDetails } from "../actions/leagueActions.js";
import Loader from "../components/Loader";
import LeagueTable from "../components/LeagueTable";
import { Container } from "react-bootstrap";

const LeagueScreen = () => {
  const params = useParams();
  const dispatch = useDispatch();

  const leagueDetails = useSelector((state) => state.leagueDetails);
  const { loading, error, league } = leagueDetails;

  useEffect(() => {
    dispatch(listLeagueDetails(params.id));
  }, [params.id, dispatch]);
  return (
    <Container>
      {loading ? (
        <Loader />
      ) : error ? (
        <h1>Error</h1>
      ) : (
        <Container>
          <Link className='btn btn-light my-3' to='/league'>
            Back To Leagues
          </Link>
          <h1 className='blue pt-3 m-0'>
            <strong>League Table</strong>
          </h1>

          {league.table && (
            <>
              <h4 className='pb-3'>{league.name} </h4>
              <LeagueTable table={league.table} sort={true} />
            </>
          )}
        </Container>
      )}
    </Container>
  );
};

export default LeagueScreen;
