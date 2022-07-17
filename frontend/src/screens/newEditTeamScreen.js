import React, { useEffect, useState } from "react";
import { Container, Form, Button, Card, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { listTeam, updateTeam } from "../actions/teamActions";
import { listPlayers, listPlayerDetails } from "../actions/playerActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import FormContainer from "../components/FormContainer";

const EditLeagueScreen = () => {
  const [name, setName] = useState("");
  const [playersUpdate, setPlayersUpdate] = useState([]);

  const dispatch = useDispatch();
  const params = useParams();

  const teamDetails = useSelector((state) => state.teamDetails);
  const { loading, error, team } = teamDetails;

  const playerList = useSelector((state) => state.playerList);
  const { loading: playersLoading, players } = playerList;

  const playerDetails = useSelector((state) => state.playerDetails);
  const { loading: playerLoading, player, success } = playerDetails;

  useEffect(() => {
    dispatch(listPlayers());
  }, [dispatch]);

  useEffect(() => {
    if (!team || team._id !== params.id) {
      dispatch(listTeam(params.id));
    } else if (playersUpdate) {
      setPlayersUpdate(team.players);
      setName(team.name);
    }
  }, [dispatch, team, , params.id]);

  useEffect(() => {
    const playerExists = playersUpdate.filter((p) => p._id === player._id)[0];
    if (!playerExists && player._id) {
      setPlayersUpdate((playersUpdate) => [...playersUpdate, player]);
    }
  }, [player._id, success]);

  const submitHandler = (e) => {
    e.preventDefault();
    const listPlayersId = [];
    for (const { _id } of playersUpdate) {
      listPlayersId.push(_id);
    }
    dispatch(updateTeam({ id: team._id, name: name, players: listPlayersId }));
  };

  const handleAdd = (e) => {
    dispatch(listPlayerDetails(e.target.value));
  };

  const handleDelete = (e) => {
    console.log("here" + e.target.value);
    setPlayersUpdate((playersUpdate) =>
      playersUpdate.filter((player) => player._id !== e.target.value)
    );
  };

  return (
    <Container>
      <Link className='btn btn-light my-3' to='/admin/teams'>
        Go Back
      </Link>
      {/* {success && <Message variant='success'>Team Updated</Message>} */}
      {loading ? (
        <Loader />
      ) : (
        <FormContainer>
          <h1>Edit Team</h1>
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
              <Form.Label>Team Name</Form.Label>
              <Form.Control
                type='text'
                // placeholder='Team Name'
                value={name}
                onChange={(e) => setName(e.target.value)}></Form.Control>
            </Form.Group>

            <Form.Group controlId='teams'>
              <Form.Label>Players</Form.Label>

              {playersUpdate.map((player) => (
                <Card key={player._id} className='p-1 my-2 mx-1 '>
                  <Col
                    key={player._id}
                    className='d-flex justify-content-between align-items-center'>
                    <h5>
                      {player.firstName} {player.lastName}
                    </h5>
                    <Button
                      variant='danger'
                      value={player._id}
                      onClick={handleDelete}>
                      <i className='fa-solid fa-xmark' />
                    </Button>
                  </Col>
                </Card>
              ))}
            </Form.Group>
            {playersLoading ? (
              <Loader />
            ) : (
              <Form.Group className='d-flex'>
                <Form.Select
                  type='select'
                  placeholder='Add Team'
                  onChange={handleAdd}>
                  <option>Add Player</option>
                  {players &&
                    players.map((player) => (
                      <option value={player._id}>
                        {player.firstName} {player.lastName}
                      </option>
                    ))}
                </Form.Select>
              </Form.Group>
            )}
            <Button className='m-2 ' type='submit' variant='primary'>
              Update Team
            </Button>
          </Form>
        </FormContainer>
      )}
    </Container>
  );
};

export default EditLeagueScreen;
