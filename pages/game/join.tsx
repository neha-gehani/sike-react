import React, { useState } from "react";
import { NextPage } from "next";
import { Container, Row, Col, Button } from "react-bootstrap";
import TextForm from "../../components/global/TextForm";
import { joinGame } from "../../api/game";
import Router from "next/router";
import { LayoutPageProps } from "../_app";

const JoinGame: NextPage<LayoutPageProps> = () => {
  const [code, setCode] = useState("");

  const join = async () => {
    if (code && code.length >= 3) {
      const game = await joinGame(code);
      Router.push(`/game/${game.identifier}`);
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
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default JoinGame;
