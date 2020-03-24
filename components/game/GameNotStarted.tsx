import React, { useState, MouseEvent } from "react";
import { Button } from "react-bootstrap";
import { Game } from "../../api/interface";
import { useSelector } from "react-redux";
import { InitialState } from "../../store";

interface GameProps {
  onClickStart: (event: MouseEvent<HTMLButtonElement>) => void;
}

interface StateProps {
  game: Game;
  userId: number;
}

const GameNotStarted: React.FC<GameProps> = ({ onClickStart }) => {
  const { game, userId } = useSelector<InitialState, StateProps>(
    (state: InitialState) => {
      return {
        game: state.game,
        userId: state.user && state.user.id
      };
    }
  );
  return (
    <>
      <h3 className="mb-4">Waiting for participants...</h3>
      {game.participants.map((participant, index) => (
        <p className="mb-3" key={index}>
          {participant.name}
        </p>
      ))}
      {userId === game.user.id ? (
        <Button
          variant="secondary"
          onClick={onClickStart}
          className="w-100 my-3"
        >
          Start game
        </Button>
      ) : (
        ""
      )}
    </>
  );
};

export default GameNotStarted;
