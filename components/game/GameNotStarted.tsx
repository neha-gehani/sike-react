import React, { useState, MouseEvent } from "react";
import { Button } from "react-bootstrap";
import { Game } from "../../api/interface";
import { useSelector } from "react-redux";
import { InitialState } from "../../store";
import ButtonWithLoader from "../global/ButtonWithLoader";

interface GameProps {
  onClickStart: (event: MouseEvent<HTMLButtonElement>) => void;
  isStarting?: boolean;
}

interface StateProps {
  game: Game;
  userId: number;
}

const GameNotStarted: React.FC<GameProps> = ({ onClickStart, isStarting }) => {
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
      {userId === game.user.id && game.participants.length >= 3 ? (
        <ButtonWithLoader
          buttonVariant="outline-primary"
          buttonText="Start game"
          onClick={onClickStart}
          className="w-100 my-3"
          isLoading={isStarting}
        />
      ) : (<>
        <p>Once we have 3, the host can hit start the game</p>
      </>)}
    </>
  );
};

export default GameNotStarted;
