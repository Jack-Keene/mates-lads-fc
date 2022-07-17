import React, { useEffect, useState } from "react";
import {
  FormLabel,
  Form,
  FormControl,
  Container,
  Card,
  Button,
  Col,
  Row,
} from "react-bootstrap";
import { Link } from "react-router-dom";

import FormContainer from "../components/FormContainer";
import Loader from "../components/Loader";
import { listFixtureDetails, updateFixture } from "../actions/fixtureActions";
import { createStat, deleteStat } from "../actions/statActions";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const SetResultScreen = () => {
  const [statsList, setStatsList] = useState([]);
  const [homeGoals, setHomeGoals] = useState();
  const [awayGoals, setAwayGoals] = useState();
  const [isPlayed, setIsPlayed] = useState();
  const [home, setHome] = useState(true);

  const params = useParams();

  const fixtureDetails = useSelector((state) => state.fixtureDetails);
  const {
    loading,
    error,
    fixture,
    fixture: { homeTeam, awayTeam, stats },
  } = fixtureDetails;

  const statCreate = useSelector((state) => state.statCreate);
  const { stat } = statCreate;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listFixtureDetails(params.id));
    if (fixture.stats) {
      setStatsList(fixture.stats);
      setHomeGoals(fixture.homeGoals);
      setAwayGoals(fixture.awayGoals);
      setIsPlayed(fixture.isPlayed);
    }
  }, [dispatch, params.id, fixture._id]);

  useEffect(() => {
    if (stat) {
      const statsUpdate = statsList.slice();
      statsUpdate.push(stat);
      setStatsList(statsUpdate);
    }
  }, [stat]);

  const handleAdd = (e) => {
    dispatch(createStat(e.target.value, "Appearance", home, fixture._id));
  };
  const handleAddGoal = (e) => {
    dispatch(createStat(e.target.value, "Goal", home, fixture._id));
  };
  const handleAddAssist = (e) => {
    dispatch(createStat(e.target.value, "Assist", home, fixture._id));
  };

  const handleDelete = (e) => {
    dispatch(deleteStat(e.target.value));
    const statsUpdate = statsList.filter((stat) => stat._id !== e.target.value);
    setStatsList(statsUpdate);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      updateFixture({
        _id: fixture._id,
        league: fixture.league,
        homeTeam: fixture.homeTeam,
        awayTeam: fixture.awayTeam,
        homeGoals: homeGoals,
        awayGoals: awayGoals,
        date: fixture.date,
        isPlayed: isPlayed,
        stats: statsList,
      })
    );
  };

  return (
    <Container>
      <Link className='btn btn-light my-3' to='/admin/fixtures'>
        Go Back
      </Link>
      <h1 className='text-center blue'>
        <strong>Set Result</strong>
      </h1>
      <FormContainer>
        {loading ? (
          <Loader />
        ) : (
          <Form className='' onSubmit={handleSubmit}>
            <div className='d-flex text-center justify-content-around'>
              <Row>
                <Col className='p-2' sm={12} md={6}>
                  <h4>{homeTeam && homeTeam.name}</h4>
                  <Form.Control
                    type='number'
                    placeholder='Home'
                    value={homeGoals}
                    onChange={(e) =>
                      setHomeGoals(e.target.value)
                    }></Form.Control>
                </Col>
                <Col className='p-2' sm={12} md={6}>
                  <h4>{awayTeam && awayTeam.name}</h4>
                  <Form.Control
                    type='number'
                    placeholder='Away'
                    value={awayGoals}
                    onChange={(e) =>
                      setAwayGoals(e.target.value)
                    }></Form.Control>
                </Col>
              </Row>
            </div>
            <hr />
            <h1 className='text-center blue'>
              <strong>Add Stats</strong>
            </h1>
            <div className='d-flex text-center align-items-center justify-content-around'>
              <Row>
                <Col
                  className='d-flex justify-content-between align-items-center'
                  sm={12}
                  md={6}>
                  <h4 style={{ whiteSpace: "nowrap" }} className='m-0'>
                    {home ? "Home" : "Away"} Stats
                  </h4>
                  <Form.Check
                    type='switch'
                    checked={home}
                    onChange={(e) => setHome(e.target.checked)}
                  />
                </Col>
                <Col
                  className='d-flex justify-content-between align-items-center'
                  sm={12}
                  md={6}>
                  <h4 className='m-0'>Played?</h4>
                  <Form.Check
                    type='switch'
                    checked={isPlayed}
                    onChange={(e) => setIsPlayed(e.target.checked)}
                  />
                </Col>
              </Row>
            </div>
            <hr />
            <h4 className='text-center'>Appearances</h4>
            {statsList &&
              statsList
                .filter(
                  (stat) => stat.stat === "Appearance" && stat.home === home
                )
                .map((stat) => (
                  <Card key={stat._id} className='border-none'>
                    <Col className='d-flex justify-content-between align-items-center p-1'>
                      <h5 className='text-center'>{stat.playerName}</h5>
                      <Button
                        variant='danger'
                        value={stat._id}
                        onClick={handleDelete}>
                        <i className='fa-solid fa-xmark'> </i>
                      </Button>
                    </Col>
                  </Card>
                ))}
            <Form.Group className='d-flex'>
              <Form.Select
                type='select'
                placeholder='Add Appearance'
                onChange={handleAdd}>
                <option>Add Appearance</option>
                {home
                  ? homeTeam &&
                    homeTeam.players.map((player) => (
                      <option key={player._id} value={player._id}>
                        {player.firstName} {player.lastName}
                      </option>
                    ))
                  : awayTeam &&
                    awayTeam.players.map((player) => (
                      <option key={player._id} value={player._id}>
                        {player.firstName} {player.lastName}
                      </option>
                    ))}
              </Form.Select>
            </Form.Group>
            <hr />
            <h4 className='text-center'>Goals</h4>
            {statsList &&
              statsList
                .filter((stat) => stat.stat === "Goal" && stat.home === home)
                .map((stat) => (
                  <Card key={stat._id} className='border-none'>
                    <Col className='d-flex justify-content-between align-items-center p-1'>
                      <h5 className='text-center'>{stat.playerName}</h5>
                      <Button
                        variant='danger'
                        value={stat._id}
                        onClick={handleDelete}>
                        <i className='fa-solid fa-xmark'> </i>
                      </Button>
                    </Col>
                  </Card>
                ))}
            <Form.Group className='d-flex'>
              <Form.Select
                type='select'
                placeholder='Add Goal'
                onChange={handleAddGoal}>
                <option>Add Goal</option>
                {home
                  ? homeTeam &&
                    homeTeam.players.map((player) => (
                      <option key={player._id} value={player._id}>
                        {player.firstName} {player.lastName}
                      </option>
                    ))
                  : awayTeam &&
                    awayTeam.players.map((player) => (
                      <option key={player._id} value={player._id}>
                        {player.firstName} {player.lastName}
                      </option>
                    ))}
              </Form.Select>
            </Form.Group>
            <hr />
            <h4 className='text-center'>Assists</h4>
            {statsList &&
              statsList
                .filter((stat) => stat.stat === "Assist" && stat.home === home)
                .map((stat) => (
                  <Card key={stat._id} className='border-none'>
                    <Col className='d-flex justify-content-between align-items-center p-1'>
                      <h5 className='text-center'>{stat.playerName}</h5>
                      <Button
                        variant='danger'
                        value={stat._id}
                        onClick={handleDelete}>
                        <i className='fa-solid fa-xmark'> </i>
                      </Button>
                    </Col>
                  </Card>
                ))}
            <Form.Group className='d-flex'>
              <Form.Select
                type='select'
                placeholder='Add Assist'
                onChange={handleAddAssist}>
                <option>Add Assist</option>
                {home
                  ? homeTeam &&
                    homeTeam.players.map((player) => (
                      <option key={player._id} value={player._id}>
                        {player.firstName} {player.lastName}
                      </option>
                    ))
                  : awayTeam &&
                    awayTeam.players.map((player) => (
                      <option key={player._id} value={player._id}>
                        {player.firstName} {player.lastName}
                      </option>
                    ))}
              </Form.Select>
            </Form.Group>
            <div className='d-flex justify-content-center'>
              <Button
                className='m-2 btn-primary'
                type='submit'
                variant='primary'>
                Set result
              </Button>
            </div>
          </Form>
        )}
      </FormContainer>
    </Container>
  );
};

export default SetResultScreen;
