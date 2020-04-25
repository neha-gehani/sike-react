import React from "react";
import { Container, Row, Col, Button, Navbar } from "react-bootstrap";
import Router, { useRouter } from "next/router";
import classnames from "classnames";

interface HeaderProps {
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ className }) => {
  const goBack = () => {
    Router.back();
  };

  const { pathname } = useRouter();
  console.log(pathname);

  return (
    <div className="header-container">
      <Navbar bg="light">
        <Button
          onClick={goBack}
          variant="link"
          className={classnames(["text-primary back-button"], {
            "d-none": pathname === "/" || pathname === "/login"
          })}
        >
          {"< Back"}
        </Button>
        <Navbar.Brand href="#home">
          Sike!!
        </Navbar.Brand>
        <Button
          onClick={goBack}
          variant="link"
          className={classnames(["text-primary back-button"], {
            "d-none": pathname === "/" || pathname === "/login"
          })}
        >
          {"< Back"}
        </Button>
      </Navbar>
    </div>
  );
};

export default Header;
