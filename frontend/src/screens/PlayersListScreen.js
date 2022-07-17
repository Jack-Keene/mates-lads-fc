import React, { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import { Table, Button, Row, Col, Container, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { listPlayers } from "../actions/playerActions";
import { PLAYER_REGISTER_RESET } from "../constants/playerConstants";

const PlayersListScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const playerList = useSelector((state) => state.playerList);
  const { loading, error, players } = playerList;

  useEffect(() => {
    dispatch(listPlayers());
  }, [dispatch]);

  // const deleteHandler = (id) => {
  //   console.log("delete");
  // };

  return (
    <Container>
      <Link className='btn btn-light my-3' to='/admin'>
        Go Back
      </Link>
      <Row>
        <Col>
          <h1>Players</h1>
        </Col>
      </Row>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Table>
          <thead>
            <tr>
              <th className='d-none d-sm-table-cell'>Number</th>
              <th>Name</th>
              <th className='d-none d-md-table-cell'>Image</th>
              <th className='d-none d-sm-table-cell'>Position</th>
              <th>Admin</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {players.map((player) => (
              <tr key={player._id}>
                <td className='d-none d-sm-table-cell'>{player.number}</td>
                <td>
                  {player.firstName} {player.lastName}
                </td>
                <td className='d-none d-md-table-cell'>
                  <Image
                    fluid
                    src='../images/playerCarouselImage.png'
                    style={{
                      maxHeight: "4vh",
                      display: "block",
                      maxWidth: "70vw",
                      width: "auto",
                      height: "auto",
                    }}
                    alt={`${player.name}`}
                  />
                </td>
                <td className='d-none d-sm-table-cell'>{player.position}</td>
                <td>
                  {player.isAdmin ? (
                    <i className='fas fa-check' style={{ color: "green" }} />
                  ) : (
                    <i className='fas fa-times' style={{ color: "red" }} />
                  )}
                </td>
                <td>
                  <LinkContainer to={`/admin/players/${player._id}/edit`}>
                    <Button variant='light' className='btn-sm'>
                      <i className='fas fa-edit' />
                    </Button>
                  </LinkContainer>
                  {/* <Button
                    variant='danger'
                    className='btn-sm'
                    onClick={() => deleteHandler(player._id)}>
                    <i className='fas fa-trash' />
                  </Button>{" "} */}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default PlayersListScreen;
