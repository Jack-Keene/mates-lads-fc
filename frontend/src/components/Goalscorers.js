import React from "react";
import { Col, Row } from "react-bootstrap";

const Goalscorers = ({ players, icon }) => {
  return (
    <Row className='d-flex justify-contents-center'>
      {Object.keys(players).map((player) => (
        <Col key={player._id} md={6} sm={6} xs={6} className='d-flex '>
          {icon && <i class='fa-solid fa-futbol' style={{ color: "#ccc" }}></i>}
          <h6 className='px-2 text-center'>
            {player.split(" ")[1]}{" "}
            {players[player] > 1 && `x ${players[player]}`}
          </h6>
        </Col>
      ))}
    </Row>
  );
};

export default Goalscorers;
