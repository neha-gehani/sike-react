import React, { useState } from "react";
import { NextPage } from "next";
import { Container, Row, Col } from "react-bootstrap";
import { guestLogin } from "../api/auth";
import TextForm from "../components/global/TextForm";
import Router from "next/router";
import { LayoutPageProps } from "./_app";

interface LoginPageProps extends LayoutPageProps {
  isAuthenticatedRoute: false;
}

const Login: NextPage<LoginPageProps> = () => {
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const doGuestLogin = async () => {
    if (name && name.length >= 3) {
      setIsLoading(true);
      const user = await guestLogin(name);
      setIsLoading(false);
      Router.push("/");
    }
  };

  return (
    <div className="page">
      <Container>
        <Row className="landing-container align-items-stretch">
          <Col>
            <div className="d-flex flex-column justify-content-start">
              <TextForm
                onClick={doGuestLogin}
                onTextUpdated={setName}
                headerText="Welcome"
                descriptionText="To continue, tell us what your friends call you."
                buttonText="Let's go!"
                placeholder="Tell us your name"
                isLoading={isLoading}
              />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;
