import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Fixtures from "../components/Fixtures";
import { Container, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { listFixtures } from "../actions/fixtureActions";
import Loader from "../components/Loader";

const FixtureScreen = () => {
  const dispatch = useDispatch();

  const [views, setViews] = useState(2);
  const [resultViews, setResultViews] = useState(2);

  const fixtureList = useSelector((state) => state.fixtureList);
  const { loading, error, fixtures } = fixtureList;

  const latest = fixtures[0];

  useEffect(() => {
    dispatch(listFixtures());
  }, [dispatch]);
  return (
    <div>
      <Container className='p-0'>
        <div bg='light' className='bg-white carousel slide carousel-light'>
          <div className='carousel-inner'>
            <img src='/images/banner1.jpg' alt='playing football' />
            <div className='active carousel-caption '>
              {latest && (
                <Card
                  className='blue blue-border px-2 py-3'
                  style={{ textAlign: "left" }}>
                  <h6 className='ps-1 pb-2'>
                    <strong>Latest Result:</strong>
                  </h6>
                  <h6 className='ps-1'>
                    <strong>{latest.league.name}</strong>
                  </h6>
                  <h6 className='ps-1 pb-2'>
                    {latest.homeTeam.name} vs {latest.awayTeam.name}{" "}
                    {latest.homeGoals} - {latest.awayGoals}
                  </h6>
                  <Link
                    to={`/fixtures/${latest._id}`}
                    style={{ borderRadius: 0, background: "#FFF" }}
                    className=' text-center btn-light border-blue btn-small m-1 py-2 link'>
                    <h6 className='blue m-0' style={{ fontSize: "12px" }}>
                      <strong>MATCH DETAILS</strong>
                    </h6>
                  </Link>
                </Card>
              )}
            </div>
          </div>
        </div>
      </Container>
      <h1 className=' text-center pt-3'>Recent Results</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <h1>{error}</h1>
      ) : (
        <>
          <Fixtures
            fixtures={
              fixtures &&
              fixtures.filter((f) => f.isPlayed).slice(1, resultViews)
            }
          />
          <div className='text-center d-flex justify-content-center'>
            {resultViews <
              Object.keys(fixtures.filter((f) => f.isPlayed)).length && (
              <button
                className='btn btn-primary mb-5 '
                onClick={() => setResultViews(resultViews + 2)}>
                View More
              </button>
            )}
          </div>
        </>
      )}
      <h1 className=' text-center pt-3'>Upcoming Fixtures</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <h1>{error}</h1>
      ) : (
        <>
          <Fixtures
            fixtures={
              fixtures && fixtures.filter((f) => !f.isPlayed).slice(0, views)
            }
          />
          <div className='text-center d-flex justify-content-center'>
            {views <=
              Object.keys(fixtures.filter((f) => !f.isPlayed)).length && (
              <button
                className='btn btn-primary mb-5 '
                onClick={() => setViews(views + 2)}>
                View More
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default FixtureScreen;
