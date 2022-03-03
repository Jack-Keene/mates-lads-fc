import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listLeagues } from "../actions/leagueActions";
import Loader from "../components/Loader";
import Leagues from "../components/Leagues";
import { Card, Col, Row, Form, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const LeagueListScreen = () => {
  const dispatch = useDispatch();

  const leagueList = useSelector((state) => state.leagueList);
  const { loading, error, leagues } = leagueList;

  useEffect(() => {
    dispatch(listLeagues());
  }, [dispatch]);
  return (
    <Container>
      <Link className='btn btn-light my-3' to='/admin'>
        Go Back
      </Link>
      <h1 className='blue pt-3 m-0'>
        <strong>Current Leagues</strong>
      </h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <h1>Error</h1>
      ) : (
        <>
          <Row>
            {leagues &&
              leagues
                .filter((league) => league.isActive)
                .map((league) => (
                  <Col md={6}>
                    <Card className='p-2 my-2'>
                      <Link
                        to={`/editLeagues/${league._id}`}
                        className='link blue'>
                        {league.name} {league.venue}
                      </Link>
                    </Card>{" "}
                  </Col>
                ))}
          </Row>
        </>
      )}
      <h1 className='blue pt-3 m-0'>
        <strong>Past Leagues</strong>
      </h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <h1>Error</h1>
      ) : (
        <>
          <Row>
            {leagues &&
              leagues
                .filter((league) => !league.isActive)
                .map((league) => (
                  <Col md={6}>
                    <Card key={league._id} className='p-2 my-2'>
                      <Link
                        to={`/editLeagues/${league._id}`}
                        className='link blue'>
                        {league.name} {league.venue}
                      </Link>
                    </Card>{" "}
                  </Col>
                ))}
          </Row>
        </>
      )}
    </Container>
  );
};

export default LeagueListScreen;
