import React, { useState } from "react";
import { NextPage, NextPageContext } from "next";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Game, User } from "../../api/interface";
import { getGame, startGame } from "../../api/game";
import { LayoutPageProps } from "../_app";
import { getUser } from "../../api/user";
import GameNotStarted from "../../components/game/GameNotStarted";
import GameQuestion from "../../components/game/GameQuestion";
import GameCode from "../../components/game/GameCode";

interface GamePageProps extends LayoutPageProps {
  gameData: Game;
  user: User;
}

const Lobby = (props) => {
  return (
    <>
      <GameCode game={props.game} />
      <GameNotStarted
        onClickStart={props.startNewGame}
        game={props.game}
        user={props.user}
      />
    </>
  )
}

const Questions = ({game, user, updateGame}) => {

  return (
    <>
      <GameQuestion
        onQuestionAnswered={updateGame}
        game={game}
        user={user}
      />
    </>
  )
}

const GamePage: NextPage<GamePageProps> = ({ gameData, user }) => {
  const [game, setGame] = useState(gameData);

  const startNewGame = async () => {
    const gameDetails = await startGame(gameData.identifier);
    setGame(gameDetails);
  };

  const updateGame = async () => {
    const game = await getGame(gameData.identifier)
    setGame(game);
  };

  const getGameByStatus = () => {
    const props = {
      game,
      user
    }
    switch(game.status) {
      case 'created':
        return Lobby({...props, startNewGame});
      case 'active':
        return Questions({...props, updateGame});
      default:
        return 
      
        
    }
  }

  // // keep polling game data
  // const gamePolling = setTimeout(async () => {
  //   const game = await getGame(gameId)
  //   setGame(game);
  // }, 5000);

  return (
    <div className="bg-dark page">
      <Container className="h-100">
        <Row className="landing-container h-100 align-items-stretch">
          <Col>
            {getGameByStatus()}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

GamePage.getInitialProps = async (context: NextPageContext) => {
  const params = context.query as any;
  const gameData = await getGame(params.gameId);
  const user = await getUser();

  return {
    gameData,
    user
  };
};

export default GamePage;
