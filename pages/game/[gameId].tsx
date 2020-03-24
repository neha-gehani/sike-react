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
import { useSelector, useDispatch } from "react-redux";
import { InitialState } from "../../store";
import { updateGameStore } from "../../states/game/actions";
import { useRouter } from "next/router";
import { updateUserStore } from "../../states/user/actions";

interface StateProps {
  game: Game;
  user: User;
}

const Lobby = props => {
  return (
    <>
      <GameCode />
      <GameNotStarted onClickStart={props.startNewGame} />
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

const GamePage: NextPage<LayoutPageProps> = () => {
  const { game, user } = useSelector<InitialState, StateProps>(
    (state: InitialState) => {
      return {
        game: state.game,
        user: state.user
      };
    }
  );

  const router = useRouter();
  const { gameId } = router.query;

  const dispatch = useDispatch();

  const setGame = gameData => {
    dispatch(updateGameStore(gameData));
  };

  const setUser = userData => {
    dispatch(updateUserStore(userData));
  };

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
  }, [gameId]);

  // keep polling game data
  useRecursiveTimeout(async () => {
    fetchGame();
  }, 10 * 1000);

  const startNewGame = async () => {
    const gameDetails = await startGame(gameId);
    setGame(gameDetails);
  };

  const updateGame = async () => {
    const updatedGame = await getGame(gameId);
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
          {game.identifier && user.id ? (
            <Col>{getGameByStatus()}</Col>
          ) : (
            <p>Loading...</p>
          )}
        </Row>
      </Container>
    </div>
  );
};

GamePage.getInitialProps = async (context: NextPageContext) => {
  return {};
};

export default GamePage;
