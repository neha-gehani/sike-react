import React, { useState } from "react";
import { NextPage, NextPageContext } from "next";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Game, User } from "../../api/interface";
import { getGame, joinGame, startGame } from "../../api/game";
import { LayoutPageProps } from "../_app";
import { getUser } from "../../api/user";
import GameNotStarted from "../../components/game/GameNotStarted";

interface GamePageProps extends LayoutPageProps {
  gameData: Game;
  user: User;
}

const GamePage: NextPage<GamePageProps> = ({ gameData, user }) => {
  const [game, setGame] = useState(gameData);

  const setGameStart = async () => {
    const gameDetails = await startGame(game.id, user);
    setGame(gameDetails);
  };

  return (
    <div className="bg-dark page">
      <Container className="h-100">
        <Row className="landing-container h-100 align-items-stretch">
          <Col>
            {game.status === "created" && (
              <GameNotStarted
                onClickStart={setGameStart}
                game={game}
                user={user}
              />
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

GamePage.getInitialProps = async (context: NextPageContext) => {
  const gameData = await getGame("setting-sip");
  const userData = await getUser();

  return {
    gameData: gameData,
    user: userData
  };
};

export default GamePage;
