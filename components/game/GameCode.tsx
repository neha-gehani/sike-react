import React, { useState, MouseEvent } from "react";
import { Button, Card } from "react-bootstrap";
import { Game, User } from "../../api/interface";
import { useSelector } from "react-redux";
import { InitialState } from "../../store";
import Share from "../global/Share";

interface GameProps {}

interface StateProps {
  game: Game;
}

const GameCode: React.FC<GameProps> = ({}) => {
  const { game } = useSelector<InitialState, StateProps>(
    (state: InitialState) => {
      return {
        game: state.game
      };
    }
  );
  let protocol = 'http:'
  if (process.browser) {
    protocol = window.location.protocol;
  }
  return (
    <>
    <Card className="text-center mt-4 mb-4">
      <Card.Body>
        <Card.Title>It's time to SIKE!!</Card.Title>
        <Card.Text>
          <p>Ask your friends to join using the following code:</p>
          <h2 className="text-primary">{game.identifier}</h2>
        </Card.Text>
        <Share 
          title="Sike Game"
          text={`${game.user.name} has invited you to join their game`}
          url={`${protocol}//sike-game.herokuapp.com/join/${game.identifier}`}
        />
      </Card.Body>
    </Card>
    </>
  );
};

export default GameCode;
