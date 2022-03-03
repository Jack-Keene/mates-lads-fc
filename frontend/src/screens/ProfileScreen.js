import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { Form, Button, Row, Col, Table, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import {
  listPlayerDetails,
  updatePlayerProfile,
} from "../actions/playerActions";

const ProfileScreen = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [number, setNumber] = useState("");
  const [position, setPosition] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const playerDetails = useSelector((state) => state.playerDetails);
  const { loading, error, player } = playerDetails;

  const playerLogin = useSelector((state) => state.playerLogin);
  const { playerInfo } = playerLogin;

  //   const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  //   const { success } = userUpdateProfile;

  const navigate = useNavigate();

  useEffect(() => {
    if (!playerInfo) {
      navigate("/login");
    } else {
      if (!player.firstName || playerInfo._id !== player._id) {
        dispatch(listPlayerDetails(playerInfo._id));
      } else {
        setFirstName(player.firstName);
        setLastName(player.lastName);
        setNumber(player.number);
        setPosition(player.position);
      }
    }
  }, [navigate, playerInfo, dispatch, player]);

  const submitHandler = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      console.log(player);
      dispatch(
        updatePlayerProfile({
          id: player._id,
          firstName,
          lastName,
          position,
          number,
        })
      );
    }
  };

  return (
    <Container>
      <Row>
        <Col md={3}>
          <h2>User Profile</h2>
          {message && <Message variant='danger'>{message}</Message>}
          {error && <Message variant='danger'>{error}</Message>}
          {/* {success && <Message variant='success'>User Updated</Message>} */}
          {loading && <Loader />}
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='firstName'>
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter Name'
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group controlId='lastName'>
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter Name'
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group controlId='number'>
              <Form.Label>Number</Form.Label>
              <Form.Control
                type='text'
                placeholder='Squad Number'
                value={number}
                onChange={(e) => setNumber(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group controlId='position'>
              <Form.Label>Position</Form.Label>
              <Form.Select
                type='select'
                placeholder='Position'
                value={position}
                onChange={(e) => setPosition(e.target.value)}>
                <option value={position}>(Current) {position}</option>
                <option value='Goalkeeper'>Goalkeeper</option>
                <option value='Defender'>Defender</option>
                <option value='Midfielder'>Midfielder</option>
                <option value='Attacker'>Attacker</option>
              </Form.Select>
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
                value={confirmPassword}
                onChange={(e) =>
                  setConfirmPassword(e.target.value)
                }></Form.Control>
            </Form.Group>
            <Button type='submit' variant='primary'>
              Update
            </Button>
          </Form>{" "}
        </Col>
      </Row>
    </Container>
  );
};

export default ProfileScreen;
