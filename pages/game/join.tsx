import React, { useState } from "react";
import { NextPage } from "next";
import Router, { useRouter } from "next/router";

import { joinGame } from "../../api/game";
import { LayoutPageProps } from "../_app";

import { Container, Row, Col, Button, Alert } from "react-bootstrap";
import TextForm from "../../components/global/TextForm";
import { ApiError } from "../../api/httpClient";

const JoinGame: NextPage<LayoutPageProps> = () => {
  const router = useRouter();
  const [code, setCode] = useState("");
  const [isJoining, setIsJoining] = useState(false);
  const [error, setError] = useState<String>(undefined);

  const join = async () => {
    if (code && code.length >= 3) {
      setIsJoining(true);
      await joinGame(code)
        .then(game => {
          setIsJoining(false);
          router.push("/game/[gameId]", `/game/${game.identifier}`);
        })
        .catch(err => {
          setIsJoining(false);
          setError((err as ApiError).response.message);
        });
    }
  };

  return (
    <div className="page">
      <Container className="h-100">
        <Row className="landing-container h-100 align-items-stretch">
          <Col>
            {error && <Alert variant="danger">{error}</Alert>}
            <TextForm
              onClick={join}
              onTextUpdated={setCode}
              headerText="Join game"
              buttonText="Join now"
              placeholder="Enter the game code"
              isLoading={isJoining}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default JoinGame;
