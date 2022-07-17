import React, { useState } from "react";
import Player from "./Player";
import { Row } from "react-bootstrap";

const PlayerGroup = ({ players, position }) => {
  const [show, setShow] = useState(true);
  const display = players.filter((p) => p.position === position);

  return (
    <Row className='m-3' onClick={() => setShow(!show)}>
      <div className='d-flex justify-content-between align-items-center'>
        <h1 className=' text-center pt-3'>
          <strong>{position}s</strong>
        </h1>
        <i className={`fas fa-caret-${show ? "up" : "down"} fa-2xl`} />
      </div>

      {show &&
        display.map((player) => <Player key={player._id} player={player} />)}
    </Row>
  );
};

export default PlayerGroup;
