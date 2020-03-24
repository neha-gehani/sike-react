import React, { useState } from "react";
import { NextPage, NextPageContext } from "next";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Game, User } from "../../api/interface";
import { getGame, startGame } from "../../api/game";
import { LayoutPageProps } from "../_app";
import { getUser } from "../../api/user";
import GameNotStarted from "../../components/game/GameNotStarted";
import GameCode from "../../components/game/GameCode";
import { isGameStarted } from "../../helpers/game";
import { useRouter } from "next/router";

interface GamePageProps extends LayoutPageProps {
  gameData: Game;
  user: User;
}

const GamePage: NextPage<GamePageProps> = ({ gameData, user }) => {
  if(!!gameData) {
    const [game, setGame] = useState(gameData);
    const hasGameStarted = isGameStarted(game.status);
  
    const setGameStart = async () => {
      const gameDetails = await startGame(game.id);
      setGame(gameDetails);
    };
  
    return (
      <div className="bg-dark page">
        <Container className="h-100">
          <Row className="landing-container h-100 align-items-stretch">
            <Col>
              {!hasGameStarted && (
                <>
                  <GameCode game={game} />
                  <GameNotStarted
                    onClickStart={setGameStart}
                    game={game}
                    user={user}
                  />
                </>
              )}
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
  return (<div></div>);
  
};

GamePage.getInitialProps = async (context: NextPageContext) => {
  const params = context.query as any;
  console.log(params.gameId)

  const gameData = await getGame(params.gameId);
  console.log({gameData})
  const userData = await getUser();

  return {
    gameData: gameData,
    user: userData
  };
};

export default GamePage;
