import React, { useEffect, useState } from "react";
import { Container, Form, Button, Card, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  listLeagueDetails,
  updateLeague,
  resetState,
} from "../actions/leagueActions";
import { createLeagueRow } from "../actions/leagueRowActions";
import { listTeams } from "../actions/teamActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import FormContainer from "../components/FormContainer";

const EditLeagueScreen = () => {
  const [leagueName, setLeagueName] = useState("");
  const [venue, setVenue] = useState("");
  const [table, setTable] = useState([]);
  const [isActive, setIsActive] = useState();

  const dispatch = useDispatch();
  const params = useParams();

  const leagueDetails = useSelector((state) => state.leagueDetails);
  const { loading: leagueLoading, error, league } = leagueDetails;

  const teamList = useSelector((state) => state.teamList);
  const { loading: teamsLoading, teams } = teamList;

  const leagueRowCreate = useSelector((state) => state.leagueRowCreate);
  const { row } = leagueRowCreate;

  const leagueUpdate = useSelector((state) => state.leagueUpdate);
  const { success } = leagueUpdate;

  useEffect(() => {
    dispatch(listTeams());
    if (!league.name || league._id !== params.id) {
      dispatch(listLeagueDetails(params.id));
    } else {
      setLeagueName(league.name);
      setVenue(league.venue);
      setTable(league.table);
      setIsActive(league.isActive);
    }

    if (row.team) {
      const newTable = table.slice();
      newTable.push(row);
      setTable(newTable);
    }
    dispatch(resetState());
  }, [params.id, dispatch, league, row]);

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(
      updateLeague({
        id: league._id,
        name: leagueName,
        venue,
        isActive,
        table,
      })
    );
  };

  const handleAdd = (e) => {
    dispatch(createLeagueRow(e.target.value, params.id));
  };

  const handleDelete = (e) => {
    console.log(e.target.value);
    const newTable = table.filter((t) => t._id !== e.target.value);
    setTable(newTable);
  };
  return (
    <Container>
      <Link className='btn btn-light my-3' to='/editLeagues'>
        Go Back
      </Link>
      {success && <Message>League Updated</Message>}
      {leagueLoading ? (
        <Loader />
      ) : (
        <FormContainer>
          <h1>{league.name}</h1>
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
              <Form.Label>League Name</Form.Label>
              <Form.Control
                type='text'
                placeholder='League Name'
                value={leagueName}
                onChange={(e) => setLeagueName(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group controlId='venue'>
              <Form.Label>Venue</Form.Label>
              <Form.Control
                type='text'
                placeholder='Venue'
                value={venue}
                onChange={(e) => setVenue(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group controlId='isActive'>
              <Form.Label>Active?</Form.Label>
              <Form.Check
                type='checkbox'
                checked={isActive}
                onChange={(e) => setIsActive(e.target.checked)}></Form.Check>
            </Form.Group>
            <Form.Group controlId='teams'>
              <Form.Label>Teams</Form.Label>

              {table &&
                table.map((row) => (
                  <Card key={row.team._id} className='p-1 my-2 mx-1 '>
                    <Col className='d-flex justify-content-between align-items-center'>
                      <h5>{row.team.name}</h5>
                      <Button
                        variant='danger'
                        value={row._id}
                        onClick={handleDelete}>
                        <i className='fa-solid fa-xmark'> </i>
                      </Button>
                    </Col>
                  </Card>
                ))}
            </Form.Group>
            <Form.Group className='d-flex'>
              <Form.Select
                type='select'
                placeholder='Add Team'
                onChange={handleAdd}>
                <option>Add Team</option>
                {teams && teams.map((team) => <option>{team.name}</option>)}
              </Form.Select>
            </Form.Group>
            <Button className='m-2 ' type='submit' variant='primary'>
              Update League
            </Button>
          </Form>
        </FormContainer>
      )}
    </Container>
  );
};

export default EditLeagueScreen;
