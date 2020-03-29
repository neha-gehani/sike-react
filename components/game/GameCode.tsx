import React, { useState, MouseEvent } from "react";
import { Button } from "react-bootstrap";
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
      <div className="mb-4">
        <p>Share the code with your friends and ask them to join:</p>
        <h3>{game.identifier}</h3>
        <Share
          title="Sike Game"
          text={`${game.user.name} has invited you to join their game`}
          url={`${protocol}//sike-game.herokuapp.com/join/${game.identifier}`}
        />
      </div>
    </>
  );
};

export default GameCode;
