import React from "react";
import { Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const Leagues = ({ leagues }) => {
  return (
    <>
      {leagues.map((league) => (
        <Row>
          <Link className='link' to={`/league/${league._id}`}>
            <h4 className='pt-4'>{league.name} </h4>
          </Link>
        </Row>
      ))}
    </>
  );
};

export default Leagues;
