import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { register } from "../actions/playerActions.js";

const RegisterScreen = () => {
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();

  const playerRegister = useSelector((state) => state.playerRegister);
  const { loading, error, playerInfo } = playerRegister;

  const navigate = useNavigate();

  useEffect(() => {
    if (playerInfo) {
      navigate("/");
    }
  }, [navigate, playerInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(register(firstName, lastName, username, password));
  };
  return (
    <FormContainer>
      <h1 className='text-center'>Sign Up</h1>
      {/* {error && <h2>{error}</h2>} */}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='firstName'>
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type='text'
            placeholder='First Name'
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}></Form.Control>
          <Form.Label>Last Name</Form.Label>
        </Form.Group>
        <Form.Group controlId='lastName'>
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
            placeholder='Enter Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}></Form.Control>
        </Form.Group>
        <Form.Group controlId='confirmPassword'>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Confirm Password'
            value={password}
            onChange={(e) => setConfirmPassword(e.target.value)}></Form.Control>
        </Form.Group>
        <Button type='submit' variant='primary'>
          Register
        </Button>
      </Form>
    </FormContainer>
  );
};

export default RegisterScreen;
