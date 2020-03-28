import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import Router from "next/router";

interface HeaderProps {
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ className }) => {
  const goBack = () => {
    console.log("asdasdasd");
    Router.back();
  };

  return (
    <div className="bg-dark header-container">
      <Container>
        <Row>
          <Col>
            <Button onClick={goBack}> Back </Button>
            <div className="site-header">
              <h1 className="site-branding">Sike!!</h1>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Header;
