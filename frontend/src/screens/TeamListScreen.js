import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listTeams } from "../actions/teamActions";
import Loader from "../components/Loader";
import { Card, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const TeamListScreen = () => {
  const dispatch = useDispatch();

  const teamList = useSelector((state) => state.teamList);
  const { loading, error, teams } = teamList;

  useEffect(() => {
    dispatch(listTeams());
  }, [dispatch]);
  return (
    <>
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
          <Row>
            {teams &&
              teams.map((team) => (
                <Col md={6}>
                  <Card className='p-2 my-2'>
                    <Link to={`/editTeam/${team._id}`} className='link blue'>
                      {team.name}
                    </Link>
                  </Card>{" "}
                </Col>
              ))}
          </Row>
        </>
      )}
    </>
  );
};

export default TeamListScreen;
