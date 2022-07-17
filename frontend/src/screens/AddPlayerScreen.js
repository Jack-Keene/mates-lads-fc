import React, { useState } from "react";
import { Form, Button, Card, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import FormContainer from "../components/FormContainer";
import Message from "../components/Message";
import { register } from "../actions/playerActions";

const AddPlayerScreen = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState();

  const dispatch = useDispatch();

  const playerRegister = useSelector((state) => state.playerRegister);
  const { success, loading } = playerRegister;

  const submitHandler = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      dispatch(register(firstName, lastName, username, password));
    } else {
      setMessage("Passwords do not match");
    }
  };

  return (
    <Container>
      <Link className='btn btn-light my-3' to='/admin'>
        Go Back
      </Link>

      <Card className='m-4 p-2 text-center d-flex justify-content-center border-none'>
        {success && <Message variant='success'>Player Created</Message>}
        {message && <Message variant='danger'>{message}</Message>}
        <FormContainer>
          <h1 className='text-center'>New Player</h1>
          <Form className='d-grid' onSubmit={submitHandler}>
            <Form.Group controlId='firstName'>
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type='text'
                placeholder='First Name'
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group controlId='lastName'>
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type='text'
                placeholder='Last Name'
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group controlId='username'>
              <Form.Label>Username</Form.Label>
              <Form.Control
                type='text'
                placeholder='Username'
                value={username}
                onChange={(e) => setUsername(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group controlId='password'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type='password'
                placeholder='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group controlId='confirmPassword'>
              <Form.Label>Confirm Password</Form.Label>

              <Form.Control
                type='password'
                placeholder='Confirm Password'
                value={confirmPassword}
                onChange={(e) =>
                  setConfirmPassword(e.target.value)
                }></Form.Control>
            </Form.Group>
            <Button className='m-2 ' type='submit' variant='primary'>
              Add Player
            </Button>
          </Form>
        </FormContainer>
      </Card>
    </Container>
  );
};

export default AddPlayerScreen;
