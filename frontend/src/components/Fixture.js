import React from "react";
import { useSelector } from "react-redux";
import { Card, Col, Row, ListGroup, Image } from "react-bootstrap";
import { Link } from "react-router-dom";

const Fixture = ({ fixture }) => {
  const date = String(Date.parse(fixture.date)).slice(0, 10);
  const dateObj = new Date(date * 1000);
  var options = {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    hour12: true,
    minute: "2-digit",
  };
  const timeString = dateObj.toLocaleTimeString("en-UK", options);

  const playerLogin = useSelector((state) => state.playerLogin);
  const { playerInfo } = playerLogin;
  return (
    <Card className='my-3 p-3 fixture' style={{ borderRadius: 0 }}>
      <Link
        className='link'
        to={
          fixture.isPlayed
            ? `/fixtures/${fixture._id}`
            : playerInfo && playerInfo.isAdmin
            ? `/admin/fixtures/${fixture._id}/edit`
            : `/fixtures/${fixture._id}`
        }>
        <Row>
          <Col className='pb-2'>
            <h5>
              <strong>{fixture.league.name}</strong>
            </h5>
            <h6>
              {fixture.league.venue} | {timeString}
            </h6>
          </Col>
        </Row>
        <Row>
          <Col className='teams' xs={9} sm={9} md={9}>
            <ListGroup variant='flush'>
              <ListGroup.Item
                md='auto'
                className='d-flex align-items-center p-0 pt-2'>
                <Image
                  style={{ maxHeight: 45 }}
                  src='/images/logo-nav.png'></Image>
                <h4 className='m-0 ps-2'>{fixture.homeTeam.name}</h4>
              </ListGroup.Item>
              <ListGroup.Item className='d-flex align-items-center p-0 pt-2'>
                <Image
                  style={{ maxHeight: 45 }}
                  src='/images/logo-nav.png'></Image>
                <h4 className='m-0 ps-2'>{fixture.awayTeam.name}</h4>
              </ListGroup.Item>
            </ListGroup>
          </Col>
          {!fixture.isPlayed && (
            <Col
              xs={3}
              sm={3}
              md={3}
              className='date d-flex justify-content-center align-items-center'>
              <ListGroup
                variant='flush'
                className='d-flex justify-items-center align-items-center '>
                <h2 style={{ fontSize: 55 }}>{fixture.date.slice(8, 10)}</h2>
                <h3 style={{ fontSize: 20 }}>{timeString.slice(7, 11)}</h3>
              </ListGroup>
            </Col>
          )}
          {fixture.isPlayed && (
            <Col
              xs={3}
              sm={3}
              md={3}
              className='score d-flex justify-content-center align-items-center'>
              <ListGroup className='score' variant='flush'>
                <ListGroup.Item md='auto' className='d-flex align-items-center'>
                  <h3>{fixture.homeGoals}</h3>
                </ListGroup.Item>
                <ListGroup.Item className='d-flex align-items-center'>
                  <h3>{fixture.awayGoals}</h3>
                </ListGroup.Item>
              </ListGroup>
            </Col>
          )}
        </Row>
      </Link>
    </Card>
  );
};

export default Fixture;
