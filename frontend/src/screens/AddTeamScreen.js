import React, { useState } from "react";
import { Form, Button, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import FormContainer from "../components/FormContainer";
import { createTeam } from "../actions/teamActions";
import Message from "../components/Message";

const AddTeamScreen = () => {
  const [name, setName] = useState("");

  const dispatch = useDispatch();

  const teamCreate = useSelector((state) => state.teamCreate);
  const { success, loading, error, team } = teamCreate;

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createTeam(name));
  };

  return (
    <>
      <Link className='btn btn-light my-3' to='/admin'>
        Go Back
      </Link>

      <Card className='m-4 p-2 text-center d-flex justify-content-center border-none'>
        {success && <Message variant='success'>Team Created</Message>}
        <FormContainer>
          <h1 className='text-center'>New Team</h1>
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
              <Form.Control
                type='text'
                placeholder='Team Name'
                value={name}
                onChange={(e) => setName(e.target.value)}></Form.Control>
            </Form.Group>
            <Button className='m-2 ' type='submit' variant='primary'>
              Add Team
            </Button>
          </Form>
        </FormContainer>
      </Card>
    </>
  );
};

export default AddTeamScreen;
