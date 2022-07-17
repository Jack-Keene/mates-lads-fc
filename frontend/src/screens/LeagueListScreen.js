import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { listLeagues } from "../actions/leagueActions";
import Loader from "../components/Loader";
import Leagues from "../components/Leagues";
import {
  Card,
  Col,
  Row,
  Form,
  Container,
  Table,
  Button,
} from "react-bootstrap";
import { Link } from "react-router-dom";

const LeagueListScreen = () => {
  const dispatch = useDispatch();

  const leagueList = useSelector((state) => state.leagueList);
  const { loading, error, leagues } = leagueList;

  useEffect(() => {
    dispatch(listLeagues());
  }, [dispatch]);
  return (
    <Container>
      <Link className='btn btn-light my-3' to='/admin'>
        Go Back
      </Link>
      <h1 className='blue pt-3 m-0'>
        <strong>Leagues</strong>
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
                <th className='d-none d-md-table-cell'>Venue</th>
                <th>Teams</th>
                <th>Active</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {leagues.map((league) => (
                <tr key={league._id}>
                  <td>{league.name}</td>
                  <td className='d-none d-md-table-cell'>{league.venue}</td>
                  <td>{league.table.length}</td>
                  <td>
                    {league.isActive ? (
                      <i className='fas fa-check' style={{ color: "green" }} />
                    ) : (
                      <i className='fas fa-times' style={{ color: "red" }} />
                    )}
                  </td>
                  <td>
                    <LinkContainer to={`/admin/leagues/${league._id}/edit`}>
                      <Button variant='light' className='btn-sm'>
                        <i className='fas fa-edit' />
                      </Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
    </Container>
  );
};

export default LeagueListScreen;
