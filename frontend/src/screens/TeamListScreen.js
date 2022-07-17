import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listTeams } from "../actions/teamActions";
import Loader from "../components/Loader";
import { Card, Col, Row, Container, Table, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

import { Link } from "react-router-dom";

const TeamListScreen = () => {
  const dispatch = useDispatch();

  const teamList = useSelector((state) => state.teamList);
  const { loading, error, teams } = teamList;

  useEffect(() => {
    dispatch(listTeams());
  }, [dispatch]);
  return (
    <Container>
      <Link className='btn btn-light my-3' to='/admin'>
        Go Back
      </Link>
      <h1 className='blue pt-3 m-0'>
        <strong>Teams</strong>
      </h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <h1>Error</h1>
      ) : (
        <>
          <Table>
            <thead>
              <tr>
                <th>Name</th>
                <th>No. Players</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {teams.map((team) => (
                <tr key={team._id}>
                  <td>{team.name}</td>
                  <td>{team.players.length}</td>

                  <td>
                    <LinkContainer to={`/admin/teams/${team._id}/edit`}>
                      <Button variant='light' className='btn-sm'>
                        <i className='fas fa-edit' />
                      </Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          {/* <Row>
            {teams &&
              teams.map((team) => (
                <Col md={6}>
                  <Card className='p-2 my-2'>
                    <Link
                      to={`/admin/teams/${team._id}/edit`}
                      className='link blue'>
                      {team.name}
                    </Link>
                  </Card>{" "}
                </Col>
              ))}
          </Row> */}
        </>
      )}
    </Container>
  );
};

export default TeamListScreen;
