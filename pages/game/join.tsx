import React, { useState } from "react";
import { NextPage } from "next";
import Router, { useRouter } from "next/router";

import { joinGame } from "../../api/game";
import { LayoutPageProps } from "../_app";

import { Container, Row, Col, Button } from "react-bootstrap";
import TextForm from "../../components/global/TextForm";

const JoinGame: NextPage<LayoutPageProps> = () => {
  const router = useRouter();
  const [code, setCode] = useState("");
  const [isJoining, setIsJoining] = useState(false);

  const join = async () => {
    if (code && code.length >= 3) {
      setIsJoining(true);
      const game = await joinGame(code);
      setIsJoining(false);
      router.push("/game/[gameId]", `/game/${game.identifier}`);
    }
  };

  return (
    <div className="bg-dark page">
      <Container className="h-100">
        <Row className="landing-container h-100 align-items-stretch">
          <Col>
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
