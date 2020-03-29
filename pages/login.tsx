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
      Router.replace("/");
    }
  };

  return (
    <div className="bg-dark page">
      <Container className="h-100">
        <Row className="landing-container h-100 align-items-stretch">
          <Col>
            <div className="h-100 d-flex flex-column justify-content-start align-items-center">
              <TextForm
                onClick={doGuestLogin}
                onTextUpdated={setName}
                headerText="Welcome :)"
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
