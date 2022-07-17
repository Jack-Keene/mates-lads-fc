// import React, { useEffect, useState } from "react";
// import { Container, Form, Button, Card, Col } from "react-bootstrap";
// import { Link } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { useParams } from "react-router-dom";
// import { listTeam, updateTeam } from "../actions/teamActions";
// import { listPlayers, listPlayerDetails } from "../actions/playerActions";
// import Loader from "../components/Loader";
// import Message from "../components/Message";

// const EditLeagueScreen = () => {
//   const [name, setName] = useState("");
//   const [playersEdit, setPlayersEdit] = useState([]);

//   const dispatch = useDispatch();
//   const params = useParams();

//   const teamDetails = useSelector((state) => state.teamDetails);
//   const { loading, error, team } = teamDetails;

//   const teamUpdate = useSelector((state) => state.teamUpdate);
//   const { success } = teamUpdate;

//   const playerList = useSelector((state) => state.playerList);
//   const { players } = playerList;

//   const playerDetails = useSelector((state) => state.playerDetails);
//   const { player } = playerDetails;

//   useEffect(() => {
//     dispatch(listPlayers());
//     if (team._id !== params.id) {
//       dispatch(listTeam(params.id));
//     } else {
//       setName(team.name);
//       setPlayersEdit(team.players);
//     }
//   }, [dispatch, team, team.players, params.id, player, success]);

//   useEffect(() => {
//     const updatedPlayers = playersEdit.slice();
//     updatedPlayers.push(player);
//     setPlayersEdit(updatedPlayers);
//   }, [player._id]);

//   useEffect(() => {
//     dispatch(listTeam(params.id));
//   }, [dispatch, teamUpdate, params.id]);

//   const submitHandler = (e) => {
//     e.preventDefault();
//     dispatch(updateTeam({ id: team._id, name: name, players: playersEdit }));
//   };

//   const handleAdd = (e) => {
//     dispatch(listPlayerDetails(e.target.value));
//   };

//   const handleDelete = (e) => {
//     const updatedPlayers = playersEdit.filter((p) => p._id !== e.target.value);
//     setPlayersEdit(updatedPlayers);
//   };
//   return (
//     <>
//       <Link className='btn btn-light my-3' to='/admin/teams'>
//         Go Back
//       </Link>
//       {success && <Message variant='success'>Team Updated</Message>}
//       {loading ? (
//         <Loader />
//       ) : (
//         <Container>
//           <h1>Edit Team</h1>
//           <Form onSubmit={submitHandler}>
//             <Form.Group controlId='name'>
//               <Form.Label>Team Name</Form.Label>
//               <Form.Control
//                 type='text'
//                 // placeholder='Team Name'
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}></Form.Control>
//             </Form.Group>

//             <Form.Group controlId='teams'>
//               <Form.Label>Players</Form.Label>

//               {playersEdit &&
//                 playersEdit.map((player) => (
//                   <Card key={player._id} className='p-1 my-2 mx-1 '>
//                     <Col className='d-flex justify-content-between align-items-center'>
//                       <h5>
//                         {player.firstName} {player.lastName}
//                       </h5>
//                       <Button
//                         variant='danger'
//                         value={player._id}
//                         onClick={handleDelete}>
//                         <i className='fa-solid fa-xmark'> </i>
//                       </Button>
//                     </Col>
//                   </Card>
//                 ))}
//             </Form.Group>
//             <Form.Group className='d-flex'>
//               <Form.Select
//                 type='select'
//                 placeholder='Add Team'
//                 onChange={handleAdd}>
//                 <option>Add Player</option>
//                 {players &&
//                   players.map((player) => (
//                     <option value={player._id}>
//                       {player.firstName} {player.lastName}
//                     </option>
//                   ))}
//               </Form.Select>
//             </Form.Group>
//             <Button className='m-2 ' type='submit' variant='primary'>
//               Update Team
//             </Button>
//           </Form>
//         </Container>
//       )}
//     </>
//   );
// };

// export default EditLeagueScreen;
