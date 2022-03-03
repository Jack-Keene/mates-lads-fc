import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Fixture from "./Fixture";

const Fixtures = ({ fixtures }) => {
  return (
    <Container>
      <Row>
        {fixtures.map((fixture) => (
          <Col md={6} key={fixture._id}>
            <Fixture fixture={fixture} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Fixtures;
