import React from "react";
import { Card, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const PlayerCard = ({ player, stats }) => {
  const goals = stats.filter((stat) => stat.stat === "Goal").length;
  const assists = stats.filter((stat) => stat.stat === "Assist").length;
  const appearances = stats.filter((stat) => stat.stat === "Appearance").length;

  return (
    <Card className='p-0 m-3 border-none bg-grey'>
      <Row className='d-flex p-0 m-0'>
        <Col
          xs={3}
          className='light-blue-bg text-center align-self-center justify-content-center p-0 m-2'
          style={{ maxWidth: "70px" }}>
          <h1
            className='m-0 align-self-center justify-content-center'
            style={{ color: "#fff", fontSize: "60px" }}>
            {player.number}
          </h1>
        </Col>
        <Col className='align-self-center justify-content-center p-0 ms-2 '>
          <h2 className='blue m-0 p-0'>{player.firstName}</h2>
          <h2 className='blue m-0 p-0'>{player.lastName}</h2>
        </Col>
      </Row>
      <Row className='p-0 m-0 d-flex justify-content-center'>
        <img
          className='p-0 m-0'
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

      {/* <img src={player.image} alt={player.image} fluid /> */}
      <Row className='d-flex justify-content-between'>
        <Col xs={1} />
        <Col xs={3} className='text-center py-2 right-border-grey'>
          <h1
            className='m-0 align-self-center dark-blue'
            style={{ fontSize: "50px" }}>
            {appearances}
          </h1>
          <h6 style={{ fontSize: "9px" }}>Appearances</h6>
        </Col>
        <Col xs={3} className='text-center py-2 right-border-grey'>
          <h1
            className='m-0 align-self-center dark-blue'
            style={{ fontSize: "50px" }}>
            {assists}
          </h1>
          <h6 style={{ fontSize: "9px" }}>Assists</h6>
        </Col>
        <Col xs={3} className='text-center py-2'>
          <h1
            className='m-0 align-self-center dark-blue'
            style={{ fontSize: "50px" }}>
            {goals}
          </h1>
          <h6 style={{ fontSize: "9px" }}>Goals</h6>
        </Col>
        <Col xs={1} />
      </Row>
      <Link
        to={`/players/${player._id}`}
        className=' text-center btn-light border-blue btn-small my-4 mx-5 py-3 link player-button'>
        <h5 className='blue m-0'>
          <strong>PLAYER PROFILE</strong>
        </h5>
      </Link>
    </Card>
  );
};

export default PlayerCard;
