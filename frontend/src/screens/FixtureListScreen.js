import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";

import { Container, Table, Button } from "react-bootstrap";
import Fixture from "../components/Fixture";
import Loader from "../components/Loader";
import { useDispatch, useSelector } from "react-redux";
import { listFixtures } from "../actions/fixtureActions";

const FixtureListScreen = () => {
  const dispatch = useDispatch();

  const fixtureList = useSelector((state) => state.fixtureList);
  const { loading, error, fixtures } = fixtureList;

  useEffect(() => {
    dispatch(listFixtures());
  }, [dispatch]);

  return (
    <Container>
      <Link className='btn btn-light my-3' to='/admin'>
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <h1>Error</h1>
      ) : (
        <>
          <Table>
            <thead>
              <tr>
                <th>League</th>
                <th className='d-none d-sm-table-cell'>Venue</th>
                <th>Fixture</th>
                <th>Played</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {fixtures.map((fixture) => (
                <tr key={fixture._id}>
                  <td>{fixture.league.name}</td>
                  <td className='d-none d-sm-table-cell'>
                    {fixture.league.venue}
                  </td>
                  <td>
                    {fixture.homeTeam.name} vs {fixture.awayTeam.name}
                  </td>
                  <td>
                    {fixture.isPlayed ? (
                      <i className='fas fa-check' style={{ color: "green" }} />
                    ) : (
                      <i className='fas fa-times' style={{ color: "red" }} />
                    )}
                  </td>
                  <td>
                    <LinkContainer to={`/admin/fixtures/${fixture._id}/edit`}>
                      <Button variant='light' className='btn-sm'>
                        <i className='fas fa-edit' />
                      </Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          {fixtures &&
            fixtures
              .filter((fixture) => !fixture.isPlayed)
              .map((fixture) => <Fixture fixture={fixture} />)}
        </>
      )}
    </Container>
  );
};

export default FixtureListScreen;
