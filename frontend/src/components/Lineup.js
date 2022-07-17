import React from "react";
import { ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";

const Lineup = ({ players }) => {
  return (
    <>
      {players.map((player) => (
        <ListGroup.Item key={player._id}>
          <Link className='link' to={`/players/${player.player}`}>
            <h5>
              {player.playerName} {player.lastName}
            </h5>
          </Link>
        </ListGroup.Item>
      ))}
    </>
  );
};

export default Lineup;
