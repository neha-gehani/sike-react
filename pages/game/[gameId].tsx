import React, { useState, useEffect } from "react";
import { NextPage, NextPageContext } from "next";
import { Container, Row, Col, Button, Modal } from "react-bootstrap";

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
import Router, { useRouter } from "next/router";
import { updateUserStore } from "../../states/user/actions";
import GameScores from "../../components/game/GameScores";
import FullPageLoader from "../../components/global/FullPageLoader";
import socketIOClient from "socket.io-client";

interface StateProps {
  game: Game;
  user: User;
}

const Lobby = props => {
  return (
    <>
      <GameCode />
      <GameNotStarted
        onClickStart={props.startNewGame}
        isStarting={props.isStartingGame}
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

const Scores = ({ redirectToHome }) => {
  return (
    <>
      <GameScores onClickStart={redirectToHome} />
    </>
  );
};

const GamePage: NextPage<LayoutPageProps> = () => {
  const [isStartingGame, setIsStartingGame] = useState(false);
  const [isExitModalVisible, setIsExitModalVisible] = useState(false);
  const [hasConfirmedAbandon, setHasConfirmedAbandon] = useState(false);
  const { game, user } = useSelector<InitialState, StateProps>(
    (state: InitialState) => {
      return {
        game: state.game,
        user: state.user
      };
    }
  );

  let protocol = "http:";
  if (process.browser) {
    protocol = window.location.protocol;
  }
  console.log(`Your protocol is ${protocol}`);
  let socket;

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

  const abandonGame = () => {
    setHasConfirmedAbandon(true);
    router.push("/");
  };

  useEffect(() => {
    console.log("here 2");
    let socket = socketIOClient(`${protocol}//sike-api.herokuapp.com`); // TODO: get from central config thing.
    socket.on(gameId, () => {
      fetchGame();
    });

    // note: dont use ://sike-api.herokuapp.com in the above line. doesnt work.
  }, []);

  useEffect(() => {
    Router.beforePopState(() => {
      if (!isExitModalVisible) {
        router.push("/game/[gameId]", `/game/${gameId}`);
        setIsExitModalVisible(true);
      } else {
        if (hasConfirmedAbandon) {
          return true;
        }
      }
      return false;
    });
  });

  useEffect(() => {
    console.log("here");
    fetchGame();
    fetchUser();
    // TODO: reconnect when socket breals.
    // TODO: alert with error when not connected.
    if (socket) {
      socket.on(gameId, () => {
        fetchGame();
      });
    }
  }, [gameId]);

  // keep polling game data
  // useRecursiveTimeout(async () => {
  //   fetchGame();
  // }, 10 * 1000);

  const startNewGame = async () => {
    setIsStartingGame(true);
    const gameDetails = await startGame(gameId);
    setIsStartingGame(false);
    setGame(gameDetails);
  };

  const updateGame = async () => {
    const updatedGame = await getGame(gameId);
    setGame(updatedGame);
  };

  const redirectToHome = () => {
    router.push("/");
  };

  const getGameByStatus = () => {
    const props = {
      game,
      user
    };
    switch (game.status) {
      case "created":
        return Lobby({ ...props, startNewGame, isStartingGame });
      case "active":
        return Questions({ ...props, updateGame });
      case "finished":
        return Scores({ redirectToHome });
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
            <FullPageLoader />
          )}
        </Row>
      </Container>
      <Modal
        show={isExitModalVisible}
        onHide={() => setIsExitModalVisible(false)}
        className="text-dark"
      >
        <Modal.Header closeButton>
          <Modal.Title>Abandon game?</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>
            The game will end if you leave it. Is this really what you want? :(
          </p>
        </Modal.Body>

        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setIsExitModalVisible(false)}
          >
            No I want to play!
          </Button>
          <Button variant="primary" onClick={() => abandonGame()}>
            Yes I'm a loser
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default GamePage;
