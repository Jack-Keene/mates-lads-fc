import React, { useEffect, useState } from "react";
import { Container, Card, ListGroup, Row, Col, Image } from "react-bootstrap";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listPlayerDetails } from "../actions/playerActions";
import Loader from "../components/Loader";

const PlayerScreen = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const [goals, setGoals] = useState(0);
  const [assists, setAssists] = useState(0);
  const [appearances, setAppearances] = useState(0);

  const playerDetails = useSelector((state) => state.playerDetails);
  const { loading, error, player } = playerDetails;

  const { stats } = player;

  useEffect(() => {
    dispatch(listPlayerDetails(params.id));
    if (stats) {
      const newGoals = stats.filter((stat) => stat.stat === "Goal").length;
      const newAssists = stats.filter((stat) => stat.stat === "Assist").length;
      const newAppearances = stats.filter(
        (stat) => stat.stat === "Appearance"
      ).length;
      setGoals(newGoals);
      setAssists(newAssists);
      setAppearances(newAppearances);
    }
  }, [params.id, dispatch, loading]);

  return (
    <Container>
      <Link className='btn btn-light my-3' to='/players'>
        Back to all Players
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <h1>Error</h1>
      ) : (
        <>
          <Card className='p-2 my-3 border-blue border-square'>
            <h1 className='py-2 px-1 blue underline-blue'>
              <strong>Player Info</strong>
            </h1>
            <ListGroup className='border-none'>
              <ListGroup.Item className='border-none d-flex justify-content-between p-1'>
                <h5>
                  <strong>Name:</strong>
                </h5>{" "}
                <h5>
                  {player.firstName} {player.lastName}
                </h5>
              </ListGroup.Item>
              <ListGroup.Item className='border-none  d-flex justify-content-between p-1'>
                <h5>
                  <strong>Number:</strong>
                </h5>
                <h5>{player.number}</h5>
              </ListGroup.Item>
              <ListGroup.Item className='border-none  d-flex justify-content-between p-1'>
                <h5>
                  <strong>Position:</strong>
                </h5>
                <h5>{player.position}</h5>
              </ListGroup.Item>
            </ListGroup>
          </Card>
          <Card className='border-none'>
            <h1 className='py-2 dark-blue'>
              <strong>Statistics</strong>
            </h1>
            <Row>
              <Col xs={6} sm={4} md={3} lg={3}>
                <Card className=' underline-blue border-square player my-3'>
                  <Image fluid src='/images/overhead_kick-transparent.png' />
                  <h1
                    className='text-center blue m-0'
                    style={{ fontSize: "35px" }}>
                    <strong>{appearances}</strong>
                  </h1>
                  <h6 className='text-center blue pb-3'>Appearances</h6>
                </Card>
              </Col>
              <Col xs={6} sm={4} md={3} lg={3}>
                <Card className=' underline-blue border-square player my-3'>
                  <Image fluid src='/images/kick-transparent.png' />
                  <h1
                    className='text-center blue m-0'
                    style={{ fontSize: "35px" }}>
                    <strong>{appearances * 45}</strong>
                  </h1>
                  <h6 className='text-center blue pb-3'>Minutes Played</h6>
                </Card>
              </Col>
              <Col xs={6} sm={4} md={3} lg={3}>
                <Card className=' underline-blue border-square player my-3'>
                  <Image fluid src='/images/celebrate-transparent.png' />
                  <h1
                    className='text-center blue m-0'
                    style={{ fontSize: "35px" }}>
                    <strong>{goals}</strong>
                  </h1>
                  <h6 className='text-center blue pb-3'>Goals</h6>
                </Card>
              </Col>
              <Col xs={6} sm={4} md={3} lg={3}>
                <Card className=' underline-blue border-square player my-3'>
                  <Image fluid src='/images/stand-transparent.png' />
                  <h1
                    className='text-center blue m-0'
                    style={{ fontSize: "35px" }}>
                    <strong>{assists}</strong>
                  </h1>
                  <h6 className='text-center blue pb-3'>Assists</h6>
                </Card>
              </Col>
            </Row>
          </Card>
        </>
      )}
    </Container>
  );
};

export default PlayerScreen;
