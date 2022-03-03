import React, { useEffect } from "react";
import { ListGroup, Image, Card, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Goalscorers from "../components/Goalscorers";
import { listFixtureDetails } from "../actions/fixtureActions";
import Loader from "../components/Loader";
import Lineup from "../components/Lineup";

const ResultScreen = () => {
  const params = useParams();
  const dispatch = useDispatch();

  const fixtureDetails = useSelector((state) => state.fixtureDetails);
  const { loading, error, fixture } = fixtureDetails;

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

  useEffect(() => {
    dispatch(listFixtureDetails(params.id));
  }, [params.id, dispatch]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <h1>Error</h1>
      ) : (
        <Row className='p-0 m-0'>
          <Col lg={8}>
            <Card className='result my-5 mx-3 p-3'>
              {fixture.league && (
                <>
                  <h2 className='blue'>
                    {fixture.isPlayed ? (
                      <strong>Full Time</strong>
                    ) : (
                      <strong>Upcoming</strong>
                    )}
                  </h2>
                  <h5
                    className='blue text-md-right'
                    style={{ fontSize: "15px" }}>
                    <strong>{fixture.league.name}</strong>
                  </h5>
                  <div className='d-flex justify-content-between underline-blue pb-3'>
                    <h5 className='text-md-right' style={{ fontSize: "15px" }}>
                      {fixture.league.venue} | {timeString}
                    </h5>
                    <h5 style={{ fontSize: "15px" }} className='blue '>
                      {fixture.isPlayed && <strong>Ft</strong>}
                    </h5>
                  </div>
                </>
              )}
              <Row>
                <Col className='pt-3'>
                  {fixture.homeTeam && (
                    <>
                      <ListGroup variant='flush'>
                        <ListGroup.Item
                          md='auto'
                          className='d-flex align-items-center justify-content-between px-0'>
                          <div className='d-flex align-self-center'>
                            <Image
                              style={{ maxHeight: 45 }}
                              src='/images/logo-nav.png'
                              className='d-flex align-self-center'></Image>
                            <h4 className='ps-3'>{fixture.homeTeam.name}</h4>
                          </div>
                          <h1
                            className='d-flex blue align-self-center justify-content-end ps-1 m-0'
                            style={{ fontSize: "3rem" }}>
                            {fixture.homeGoals}
                          </h1>
                        </ListGroup.Item>
                        <ListGroup.Item md='auto'>
                          <Goalscorers
                            icon={true}
                            players={fixture.stats
                              .filter(
                                (stat) => stat.stat === "Goal" && stat.home
                              )
                              .reduce(
                                (acc, curr) => (
                                  acc[curr.playerName]
                                    ? ++acc[curr.playerName]
                                    : (acc[curr.playerName] = 1),
                                  acc
                                ),
                                {}
                              )}
                          />
                        </ListGroup.Item>
                        <ListGroup.Item md='auto'>
                          <Row></Row>
                        </ListGroup.Item>
                        <ListGroup.Item
                          md='auto'
                          className='d-flex align-items-center justify-content-between px-0'>
                          <div className='d-flex align-self-center'>
                            <Image
                              style={{ maxHeight: 45 }}
                              src='/images/logo-nav.png'
                              className='d-flex align-self-center'></Image>
                            <h4 className='ps-3'>
                              {fixture.awayTeam && fixture.awayTeam.name}
                            </h4>
                          </div>
                          <h1
                            className='d-flex blue align-self-center justify-content-end ps-1 m-0'
                            style={{ fontSize: "3rem" }}>
                            {fixture.awayGoals}
                          </h1>
                        </ListGroup.Item>
                        <ListGroup.Item md='auto'>
                          <Goalscorers
                            players={fixture.stats.filter(
                              (stat) => stat.stat === "Goal" && !stat.home
                            )}
                          />
                        </ListGroup.Item>
                      </ListGroup>
                    </>
                  )}
                </Col>
              </Row>
            </Card>
          </Col>
          <Col lg={4}>
            <Card className='text-center border-none mb-5 mx-3 p-4'>
              <h4>
                <strong>Lineup</strong>
              </h4>
              <Row>
                <Col>
                  <ListGroup variant='flush'>
                    {fixture.homeTeam && (
                      <Lineup players={fixture.homeTeam.players} />
                    )}
                  </ListGroup>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      )}
    </>
  );
};

export default ResultScreen;
