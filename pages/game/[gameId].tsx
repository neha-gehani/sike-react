import React, { useState, useEffect } from "react";
import { NextPage, NextPageContext } from "next";
import { Container, Row, Col, Button } from "react-bootstrap";

import { Game, User } from "../../api/interface";
import { getUser } from "../../api/user";
import { getGame, startGame } from "../../api/game";

import useRecursiveTimeout from "../../helpers/customHook";

import { LayoutPageProps } from "../_app";
import GameNotStarted from "../../components/game/GameNotStarted";
import GameQuestion from "../../components/game/GameQuestion";
import GameCode from "../../components/game/GameCode";
import { useRouter } from "next/router";

interface GamePageProps extends LayoutPageProps {
  gameId: string;
}

const Lobby = props => {
  return (
    <>
      <GameCode game={props.game} />
      <GameNotStarted
        onClickStart={props.startNewGame}
        game={props.game}
        user={props.user}
      />
    </>
  );
};

const Questions = ({ game, user, updateGame }) => {
  return (
    <>
      <GameQuestion onQuestionAnswered={updateGame} game={game} user={user} />
    </>
  );
};

const GamePage: NextPage<GamePageProps> = ({ gameId }) => {
  //todo: neha remove this with store integration
  const [game, setGame] = useState<Game>(undefined);
  const [user, setUser] = useState<User>(undefined);

  const fetchGame = async () => {
    const gameData = await getGame(gameId);
    setGame(gameData);
  };

  const fetchUser = async () => {
    const userData = await getUser();
    setUser(userData);
  };

  useEffect(() => {
    fetchGame();
    fetchUser();
  });

  // keep polling game data
  useRecursiveTimeout(async () => {
    const updatedGame = await getGame(game.identifier);
    setGame(updatedGame);
  }, 10 * 1000);

  const startNewGame = async () => {
    const gameDetails = await startGame(game.identifier);
    setGame(gameDetails);
  };

  const updateGame = async () => {
    const updatedGame = await getGame(game.identifier);
    setGame(updatedGame);
  };

  const getGameByStatus = () => {
    const props = {
      game,
      user
    };
    switch (game.status) {
      case "created":
        return Lobby({ ...props, startNewGame });
      case "active":
        return Questions({ ...props, updateGame });
      default:
        return;
    }
  };

  return (
    <div className="bg-dark page">
      <Container className="h-100">
        <Row className="landing-container h-100 align-items-stretch">
          {game && <Col>{getGameByStatus()}</Col>}
          {!game && <p>Loading...</p>}
        </Row>
      </Container>
    </div>
  );
};

GamePage.getInitialProps = async (context: NextPageContext) => {
  const params = context.query as any;

  return {
    gameId: params.gameId
  };
};

export default GamePage;
