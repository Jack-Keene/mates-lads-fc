import React from "react";
import { Carousel, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const ArticleCarousel = () => {
  return (
    <Container className='p-0'>
      <Carousel className='bg-white' bg='light' variant='light'>
        <Carousel.Item>
          <Link to='/fixtures'>
            <img src='/images/banner2.jpg' alt='bannerImage' />
            <Carousel.Caption>
              <h3>
                <strong>Fixtures and Results</strong>
              </h3>
              <p>View latest scores and upcoming fixtures.</p>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>

        <Carousel.Item>
          <Link to='/league'>
            <img src='/images/banner1.jpg' alt='bannerImage' />
            <Carousel.Caption>
              <h3>
                <strong>Current Leagues</strong>
              </h3>
              <p>View all current leagues.</p>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
        <Carousel.Item>
          <Link to='/players'>
            <img src='/images/banner3.jpg' alt='bannerImage' />
            <Carousel.Caption>
              <h3>Players</h3>
              <p>View Player Info.</p>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      </Carousel>
    </Container>
  );
};

export default ArticleCarousel;
