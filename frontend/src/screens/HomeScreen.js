import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Fixtures from "../components/Fixtures";
import ArticleCarousel from "../components/ArticleCarousel";
import PlayerCarousel from "../components/PlayerCarousel";
import { listFixtures } from "../actions/fixtureActions";
import Loader from "../components/Loader";
import { listLeagues } from "../actions/leagueActions";
import LeagueTable from "../components/LeagueTable";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { listPlayers } from "../actions/playerActions";

const HomeScreen = () => {
  const dispatch = useDispatch();

  const fixtureList = useSelector((state) => state.fixtureList);
  const {
    loading: fixtureLoading,
    error: fixtureError,
    fixtures,
  } = fixtureList;

  const leagueList = useSelector((state) => state.leagueList);
  const { loading: leaguesLoading, error: leaguesError, leagues } = leagueList;

  const playerList = useSelector((state) => state.playerList);
  const { loading: playersLoading, error: playersError, players } = playerList;

  useEffect(() => {
    dispatch(listFixtures());
    dispatch(listLeagues());
    dispatch(listPlayers());
  }, [dispatch]);

  const league = leagues.filter((league) => league.isActive)[0];

  return (
    <>
      <ArticleCarousel />
      <span className='line dark-blue'>
        <h1 className=''>
          <span>
            <strong>Matches</strong>
          </span>
        </h1>
      </span>
      {fixtureLoading ? (
        <Loader />
      ) : fixtureError ? (
        <h1>{fixtureError}</h1>
      ) : (
        <Fixtures fixtures={fixtures && fixtures.slice(0, 2)} />
      )}

      <div className='text-center d-flex justify-content-center'>
        <Link to={`/fixtures`} className='line btn btn-primary my-4 mx-5'>
          View All
        </Link>
      </div>
      <span className='line dark-blue'>
        <h1 className=''></h1>
      </span>
      {leaguesLoading ? (
        <Loader />
      ) : leaguesError ? (
        <h1>{leaguesError}</h1>
      ) : (
        <Container>
          <h5 className='py-1 dark-blue'>
            <strong>{league && league.name}</strong>
          </h5>
          {league && <LeagueTable table={league.table} sort={false} />}
        </Container>
      )}
      <span className='line dark-blue'>
        <h1 className=''></h1>
      </span>
      {playersLoading ? (
        <Loader />
      ) : playersError ? (
        <h1>{playersError}</h1>
      ) : (
        <PlayerCarousel players={players.slice(0, 5)} />
      )}
    </>
  );
};

export default HomeScreen;
