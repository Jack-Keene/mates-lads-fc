import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Card, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import FormContainer from "../components/FormContainer";
import { createFixture } from "../actions/fixtureActions.js";
import { listLeagues, listLeagueDetails } from "../actions/leagueActions.js";

const AddFixtureScreen = () => {
  const [leagueId, setLeagueId] = useState("");
  const [homeTeam, setHomeTeam] = useState("");
  const [awayTeam, setAwayTeam] = useState("");
  const [date, setDate] = useState(null);

  const dispatch = useDispatch();

  const leagueList = useSelector((state) => state.leagueList);
  const { loading, error, leagues } = leagueList;

  const leagueDetails = useSelector((state) => state.leagueDetails);
  const {
    league: { table },
  } = leagueDetails;

  const fixtureCreate = useSelector((state) => state.fixtureCreate);
  const { success } = fixtureCreate;

  useEffect(() => {
    dispatch(listLeagues());
    dispatch(listLeagueDetails(leagueId));
  }, [dispatch, leagueId]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createFixture(leagueId, homeTeam, awayTeam, date));
  };

  return (
    <Container>
      <Link className='btn btn-light my-3' to='/admin'>
        Go Back
      </Link>

      <Card className='m-4 p-2 text-center d-flex justify-content-center border-none'>
        <FormContainer>
          <h1 className='text-center'>Add Fixture</h1>
          {loading && <Loader />}
          {success && <Message>Fixture Created</Message>}
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='leagueId'>
              <Form.Label>League</Form.Label>
              <Form.Select
                type='select'
                placeholder='League'
                value={leagueId}
                onChange={(e) => setLeagueId(e.target.value)}>
                <option>Select League</option>
                {leagues
                  .filter((l) => l.isActive)
                  .map((league) => (
                    <option key={league._id} value={league._id}>
                      {league.name} || {league.venue}
                    </option>
                  ))}
              </Form.Select>
            </Form.Group>
            <Form.Group controlId='date'>
              <Form.Label>Date</Form.Label>
              <Form.Control
                type='datetime-local'
                onChange={(e) => setDate(e.target.value)}></Form.Control>
            </Form.Group>
            {table && (
              <Form.Group controlId='homeTeam'>
                <Form.Label>Home Team</Form.Label>
                <Form.Select
                  type='select'
                  placeholder='Home Team'
                  onChange={(e) => setHomeTeam(e.target.value)}>
                  <option>Home Team</option>
                  {table.map((t) => (
                    <option value={t.team._id}>{t.team.name}</option>
                  ))}
                </Form.Select>
              </Form.Group>
            )}
            {table && (
              <Form.Group controlId='awayTeam'>
                <Form.Label>Away Team</Form.Label>
                <Form.Select
                  type='select'
                  placeholder='Away Team'
                  // value={leagueName}
                  onChange={(e) => setAwayTeam(e.target.value)}>
                  <option>Away Team</option>
                  {table.map((t) => (
                    <option value={t.team._id}>{t.team.name}</option>
                  ))}
                </Form.Select>
              </Form.Group>
            )}
            <Button className='m-2 ' type='submit' variant='primary'>
              Add Fixture
            </Button>
          </Form>
        </FormContainer>
      </Card>
    </Container>
  );
};

export default AddFixtureScreen;
