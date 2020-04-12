import React, { useState } from "react";
import { NextPage } from "next";
import { Container, Row, Col, Alert } from "react-bootstrap";
import { guestLogin } from "../api/auth";
import TextForm from "../components/global/TextForm";
import Router from "next/router";
import { LayoutPageProps } from "./_app";
import { ApiError } from "../api/httpClient";

interface LoginPageProps extends LayoutPageProps {}

const Login: NextPage<LoginPageProps> = () => {
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState("");
  const [error, setError] = useState<String>(undefined);

  const doGuestLogin = async () => {
    if (name && name.length >= 3) {
      setFormError("");
      setIsLoading(true);
      await guestLogin(name)
        .then(user => {
          setError("");
          setIsLoading(false);
          Router.replace("/");
        })
        .catch(err => {
          setIsLoading(false);
          setError((err as ApiError).response.message);
        });
    } else {
      setFormError("Name is required and must be more than 3 characters long");
    }
  };

  return (
    <div className="page">
      <Container className="h-100">
        <Row className="landing-container h-100 align-items-stretch">
          <Col>
            <div className="h-100 d-flex flex-column justify-content-start align-items-center">
              {error && (
                <Alert variant="danger" className="w-100">
                  {error}
                </Alert>
              )}
              <TextForm
                onClick={doGuestLogin}
                onTextUpdated={setName}
                headerText="Welcome :)"
                buttonText="Let's go!"
                placeholder="Tell us your name"
                isLoading={isLoading}
                errorText={formError}
              />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;
