import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import Router from "next/router";

interface HeaderProps {
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ className }) => {
  const goBack = () => {
    Router.back();
  };

  return (
    <div className="bg-dark header-container">
      <Container>
        <Row className="align-items-center">
          <Col>
            <Button
              onClick={goBack}
              variant="link"
              className="text-primary back-button"
            >
              {"< Back"}
            </Button>
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
