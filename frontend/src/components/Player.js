import React from "react";
import { Col, Row, Image } from "react-bootstrap";
import { Link } from "react-router-dom";

const Player = ({ player }) => {
  return (
    <Col sm={6} lg={4} className='bg-grey'>
      <Link to={`/players/${player._id}`} className='link'>
        <Row className='py-4 px-0 d-flex justify-content-center'>
          <Image
            className='zoom'
            fluid
            src='./images/playerCarouselImage.png'
            style={{
              maxHeight: "50vh",
              display: "block",
              maxWidth: "75vw",
              width: "auto",
              height: "auto",
            }}
            alt={`${player.name}`}
          />
        </Row>
        <Row className=''>
          <Col
            xs={3}
            className='m-2 light-blue-bg text-center align-self-center justify-content-center'
            style={{ maxWidth: "70px" }}>
            <h1
              className=' align-self-center justify-content-center'
              style={{ color: "#fff", fontSize: "60px" }}>
              {player.number}
            </h1>
          </Col>
          <Col className='align-self-center justify-content-center p-0 ms-2 '>
            <h2 className='blue m-0 p-0'>
              <strong>
                {player.firstName} {player.lastName}
              </strong>
            </h2>
          </Col>
        </Row>
      </Link>
    </Col>
  );
};

export default Player;
