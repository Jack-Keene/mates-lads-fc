import React from "react";
import { Container, Row } from "react-bootstrap";

const Footer = () => {
  return (
    <footer>
      <hr />
      <Container>
        <Row className='mx-5 pt-3 pb-5 d-flex justify-content-center'>
          <h5 className='text-center'>Sponsored by</h5>
          <img
            style={{
              maxHeight: "5vh",
              display: "block",
              maxWidth: "75vw",
              width: "auto",
              height: "auto",
            }}
            src='/images/clarendon-arms-sponsor.png'
            alt='clarendon-sponsor'
          />
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
