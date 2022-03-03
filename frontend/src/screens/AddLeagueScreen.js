import React, { useState } from "react";
import { Form, Button, Card, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import FormContainer from "../components/FormContainer";
import { createLeague } from "../actions/leagueActions";
import Message from "../components/Message";

const AddLeagueScreen = () => {
  const [name, setName] = useState("");
  const [venue, setVenue] = useState("");

  const dispatch = useDispatch();

  const leagueCreate = useSelector((state) => state.leagueCreate);
  const { success } = leagueCreate;

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createLeague(name, venue));
  };

  return (
    <Container>
      <Link className='btn btn-light my-3' to='/admin'>
        Go Back
      </Link>

      <Card className='m-4 p-2 text-center d-flex justify-content-center border-none'>
        {success && <Message variant='success'>League Created</Message>}
        <FormContainer>
          <h1 className='text-center'>New League</h1>
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
              <Form.Label>League Name</Form.Label>
              <Form.Control
                type='text'
                placeholder='League Name'
                value={name}
                onChange={(e) => setName(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group controlId='venue'>
              <Form.Label>Venue</Form.Label>
              <Form.Control
                type='text'
                placeholder='Venue'
                value={venue}
                onChange={(e) => setVenue(e.target.value)}></Form.Control>
            </Form.Group>
            <Button className='m-2 ' type='submit' variant='primary'>
              Add League
            </Button>
          </Form>
        </FormContainer>
      </Card>
    </Container>
  );
};

export default AddLeagueScreen;
