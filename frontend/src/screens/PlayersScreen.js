import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";
import PlayerGroup from "../components/PlayerGroup";
import { listPlayers } from "../actions/playerActions";
import Loader from "../components/Loader";

const PlayersScreen = () => {
  const dispatch = useDispatch();

  const playerList = useSelector((state) => state.playerList);
  const { loading, error, players } = playerList;

  useEffect(() => {
    dispatch(listPlayers());
  }, [dispatch]);

  return (
    <Container>
      <Link className='btn btn-light my-3' to='/players/league'>
        View Player Stats
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <h1>Error</h1>
      ) : (
        <>
          <PlayerGroup position={"Goalkeeper"} players={players}></PlayerGroup>
          <PlayerGroup position={"Defender"} players={players}></PlayerGroup>
          <PlayerGroup position={"Midfielder"} players={players}></PlayerGroup>
          <PlayerGroup position={"Attacker"} players={players}></PlayerGroup>
        </>
      )}
    </Container>
  );
};

export default PlayersScreen;
