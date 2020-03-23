import React, { useState } from "react";
import { NextPage, NextPageContext } from "next";
import { Container, Row, Col } from "react-bootstrap";
import { Game } from "../../api/interface";
import { getGame } from "../../api/game";
import { LayoutPageProps } from "../_app";

interface GamePageProps extends LayoutPageProps {
  game: Game;
}

const GamePage: NextPage<GamePageProps> = ({ game }) => {
  return (
    <div className="bg-dark page">
      <Container className="h-100">
        <Row className="landing-container h-100 align-items-stretch">
          <Col>
            <h3>Waiting for other participants...</h3>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

GamePage.getInitialProps = async (context: NextPageContext) => {
  const gameData = await getGame("setting-sip");

  return {
    game: gameData
  };
};

export default GamePage;
