import React, { useState } from "react";
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
import { isGameStarted } from "../../helpers/game";
import { useRouter } from "next/router";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { updateGame } from "../../states/game/actions";

interface GamePageProps extends LayoutPageProps {
  gameData: Game;
  user: User;
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

const GamePage: NextPage<GamePageProps> = ({ gameData, user }) => {
  const [game, setGame] = useState(gameData);

  // keep polling game data
  useRecursiveTimeout(async () => {
    const game = await getGame(gameData.identifier);
    setGame(game);
  }, 10 * 1000);

  const startNewGame = async () => {
    const gameDetails = await startGame(gameData.identifier);
    setGame(gameDetails);
  };

  const updateGame = async () => {
    const game = await getGame(gameData.identifier);
    setGame(game);
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
          <Col>{getGameByStatus()}</Col>
        </Row>
      </Container>
    </div>
  );
};

const mapStateToProps = state => ({
  game: state.game
});

const mapDispatchToProps = dispatch => ({
  updateGame: bindActionCreators(updateGame, dispatch)
});

GamePage.getInitialProps = async (context: NextPageContext) => {
  const params = context.query as any;
  const gameData = await getGame(params.gameId);
  const user = await getUser();

  return {
    gameData,
    user
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GamePage);
