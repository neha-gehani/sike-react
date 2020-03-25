import React, { useState, MouseEvent } from "react";
import { Button } from "react-bootstrap";
import { Game, User } from "../../api/interface";
import { useSelector } from "react-redux";
import { InitialState } from "../../store";

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
  return (
    <>
      <div className="text-center mb-4">
        <p>Ask your friends to join:</p>
        <h3 className="text-primary">{game.identifier}</h3>
      </div>
    </>
  );
};

export default GameCode;
