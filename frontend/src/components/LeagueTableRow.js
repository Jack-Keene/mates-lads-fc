import React from "react";
import { ListGroup, Col, Row } from "react-bootstrap";

const LeagueTableRow = ({ team }) => {
  return (
    <ListGroup.Item key={team.name} className='text-center'>
      <Row>
        <Col>1</Col>
        <Col>{team.name}</Col>
        <Col className='d-none d-xs-block'>{team.played}</Col>
        <Col className='d-none d-md-block'>{team.won}</Col>
        <Col className='d-none d-md-block'>{team.lost}</Col>
        <Col className='d-none d-lg-block'>{team.for}</Col>
        <Col className='d-none d-lg-block'>{team.against}</Col>
        <Col className='d-none d-xs-block'>{team.goalDifference}</Col>
        <Col>{team.points}</Col>
      </Row>
    </ListGroup.Item>
  );
};

export default LeagueTableRow;
