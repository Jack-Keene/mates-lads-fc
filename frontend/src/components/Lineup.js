import React from "react";
import { ListGroup } from "react-bootstrap";

const Lineup = ({ players }) => {
  return (
    <>
      {players.map((player) => (
        <ListGroup.Item key={player._id}>
          <h5>
            {player.firstName} {player.lastName}
          </h5>
        </ListGroup.Item>
      ))}
    </>
  );
};

export default Lineup;
