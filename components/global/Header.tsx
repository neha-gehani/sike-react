import React from "react";
import { Container, Row, Col } from "react-bootstrap";

interface HeaderProps {
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ className }) => {
  return (
    <div className="header-container">
      <Container>
        <Row>
          <Col>
            <div className="site-header pt-2">
              <h2 className="site-branding">Sike!!</h2>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Header;
