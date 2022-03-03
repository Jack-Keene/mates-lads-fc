import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";
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
