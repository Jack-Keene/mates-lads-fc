import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Form, Button, Row, Col, Table, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import {
  listPlayerDetails,
  updatePlayerProfile,
} from "../actions/playerActions";

const ProfileScreen = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [number, setNumber] = useState("");
  const [position, setPosition] = useState("");

  const dispatch = useDispatch();
  const params = useParams();

  const playerID = params.id;
  console.log(playerID);

  const playerDetails = useSelector((state) => state.playerDetails);
  const { loading, error, player, success } = playerDetails;

  useEffect(() => {
    if (!player._id || player._id != playerID) {
      dispatch(listPlayerDetails(playerID));
    } else {
      console.log("got here");
      setFirstName(player.firstName);
      setLastName(player.lastName);
      setNumber(player.number);
      setPosition(player.position);
    }
  }, [playerID, dispatch, player]);

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(
      updatePlayerProfile({
        id: player._id,
        firstName,
        lastName,
        position,
        number,
      })
    );
  };

  return (
    <Container>
      <Link className='btn btn-light my-3' to='/admin/players'>
        Go Back
      </Link>

      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}
      <FormContainer>
        <h2>Edit Player</h2>
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
          <Button type='submit' variant='primary'>
            Update
          </Button>
        </Form>{" "}
      </FormContainer>
    </Container>
  );
};

export default ProfileScreen;
