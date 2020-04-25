import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import Router, { useRouter } from "next/router";
import classnames from "classnames";

interface HeaderProps {
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ className }) => {

  return (
    <div className="header-container">
      <Container>
        <Row className="align-items-center">
          <Col>
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
