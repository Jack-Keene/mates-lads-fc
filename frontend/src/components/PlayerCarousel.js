import React from "react";
import { Carousel, Container } from "react-bootstrap";
import PlayerCard from "./PlayerCard";

const PlayerCarousel = ({ players }) => {
  return (
    <Container className='p-0 bg-grey'>
      <Carousel
        className=''
        bg=''
        variant=''
        nextIcon={
          <span className='light-blue-bg fa-solid fa-caret-right fa-xl p-4'></span>
        }
        prevIcon={
          <span className='light-blue-bg fa-solid fa-caret-left fa-xl p-4'></span>
        }
        indicators={false}>
        {players.map((player) => (
          <Carousel.Item key={player._id}>
            {player.stats && (
              <PlayerCard player={player} stats={player.stats} />
            )}
          </Carousel.Item>
        ))}
      </Carousel>
    </Container>
  );
};

export default PlayerCarousel;
