import React from "react";
import Player from "./Player";
import { Row } from "react-bootstrap";

const PlayerGroup = ({ players, position }) => {
  const display = players.filter((p) => p.position === position);

  return (
    <Row className='m-3'>
      <h1 className=' text-center pt-3'>
        <strong>{position}s</strong>
      </h1>
      {display.map((player) => (
        <Player key={player._id} player={player} />
      ))}
    </Row>
  );
};

export default PlayerGroup;
