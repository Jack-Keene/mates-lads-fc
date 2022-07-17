import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Container, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

const AdminScreen = () => {
  const [leagueOpen, setLeagueOpen] = useState(false);
  const [fixtureOpen, setFixtureOpen] = useState(false);
  const [teamOpen, setTeamOpen] = useState(false);
  const [playerOpen, setPlayerOpen] = useState(false);

  const playerLogin = useSelector((state) => state.playerLogin);
  const { playerInfo } = playerLogin;

  return (
    <>
      {playerInfo && playerInfo.isAdmin && (
        <>
          <h1 className='text-center blue pt-3 m-0'>
            <strong>Admin</strong>
          </h1>
          <Container className='text-center'>
            <Card className='p-2 m-2'>
              <h3
                style={{ cursor: "pointer" }}
                onClick={() => setLeagueOpen(!leagueOpen)}>
                Leagues
              </h3>
              {leagueOpen && (
                <>
                  <Link className='link ' to='leagues/add'>
                    Add League
                  </Link>
                  <Link className='link' to='leagues'>
                    Edit Leagues
                  </Link>
                </>
              )}
            </Card>
            <Card className='p-2 m-2'>
              <h3
                style={{ cursor: "pointer" }}
                onClick={() => setFixtureOpen(!fixtureOpen)}>
                Fixtures
              </h3>
              {fixtureOpen && (
                <>
                  <Link className='link' to='fixtures/add'>
                    Add Fixture
                  </Link>
                  <Link className='link' to='fixtures'>
                    Set Result
                  </Link>
                </>
              )}
            </Card>
            <Card className='p-2 m-2'>
              <h3
                style={{ cursor: "pointer" }}
                onClick={() => setTeamOpen(!teamOpen)}>
                Teams
              </h3>
              {teamOpen && (
                <>
                  <Link className='link' to='teams/add'>
                    Add Team
                  </Link>
                  <Link className='link' to='teams'>
                    Edit Team
                  </Link>
                </>
              )}
            </Card>
            <Card className='p-2 m-2'>
              <h3
                style={{ cursor: "pointer" }}
                onClick={() => setPlayerOpen(!playerOpen)}>
                Players
              </h3>
              {playerOpen && (
                <>
                  <Link className='link' to='players/add'>
                    Add Player
                  </Link>
                  <Link className='link' to='players'>
                    Edit Players
                  </Link>
                </>
              )}
            </Card>
          </Container>
        </>
      )}
    </>
  );
};

export default AdminScreen;
