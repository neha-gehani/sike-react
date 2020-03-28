import React, { useState, MouseEvent } from "react";
import keyBy from "lodash/keyBy";
import flatten from "lodash/flatten";
import { Game, User, Question, Answer, Vote } from "../../api/interface";
import { sendAnswer } from "../../api/questions";
import { voteForAnswer } from "../../api/answer";

import NotAnswered from "./question/NotAnswered";
import AnsweredWaiting from "./question/AnsweredWaiting";
import Voting from "./question/Voting";
import VotingResults from "./question/VotingResults";
import { getCurrentUserScore } from "../../helpers/game";
import PlayerScore from "./PlayerScore";

const getQuestionState: (
  question: Question,
  user: User,
  game: Game
) => string = function(currentQuestion, user, game) {

  if (currentQuestion.status === "voting") {
    // check if the user has answered this question

    // 1. create a map of answers by the users who have answered them
    const answersMap = keyBy(currentQuestion.answers, "user.id", {});

    // 2. if the answers exist, check if there is an answer with the current users id
    const userHasAnswered =
      currentQuestion.answers.length > 0 && !!answersMap[user.id];

    if (userHasAnswered) {
      // check if all the users have answered
      if (currentQuestion.answers.length === game.participants.length) {
        // voting has started
        // check if the current user has voted for any answer
        const userVoted = currentQuestion.answers.find((answer: Answer) => {
          return answer.votes.find((vote: Vote) => vote.id === user.id)
        });

        if(!!userVoted) {
          return "voted-waiting";
        }

        return "voting";
      }
      return "answered-waiting";
    }
  }

  return "not-answered";
};

const NotAnsweredTemplate = ({ currentQuestion, user }) => {
  return (
    <>
      <NotAnswered currentQuestion={currentQuestion} user={user}></NotAnswered>
    </>
  );
};

const AnsweredWaitingTemplate = ({ currentQuestion, user }) => {
  return (
    <>
      <AnsweredWaiting
        currentQuestion={currentQuestion}
        user={user}
      ></AnsweredWaiting>
    </>
  );
};

const VotingTemplate = ({ currentQuestion, user }) => {
  return (
    <>
      <Voting currentQuestion={currentQuestion} user={user}></Voting>
    </>
  );
};

const VotingResultsTemplate = ({ currentQuestion, user, game }) => {
  return (
    <>
      <VotingResults 
        currentQuestion={currentQuestion} 
        user={user}
        participants={game.participants}></VotingResults>
    </>
  )
}

const getQuestionByState = ({ game, user }) => {
  // The question can have 4 states
  // viz. created | answering | voting | finished
  // if the question is in answering | voting then it is shown to all users
  const currentQuestion: Question = game.questions.find(
    question => question.status === "answering" || question.status === "voting"
  );
  const props = { game, user, currentQuestion };
  const questionStatus: string = getQuestionState(currentQuestion, user, game);

  switch (questionStatus) {
    case "answered-waiting":
      return AnsweredWaitingTemplate({ ...props });
    case "voting":
      return VotingTemplate({ ...props });
    case "voted-waiting":
      return VotingResultsTemplate({...props});
    case "not-answered":
    default:
      return NotAnsweredTemplate({ ...props });
  }
};

interface GameProps {
  game: Game;
  user: User;
  onQuestionAnswered: () => void;
}

const GameQuestion: React.FC<GameProps> = ({ game, user }) => {
  const myScore = getCurrentUserScore(game.scores, user.id);
  return (
    <>
      {getQuestionByState({
        game,
        user
      })}

      <PlayerScore
        score={myScore}
        className="current-score"
        isCurrentPlayerScore={true}
      />
    </>
  );
};

export default GameQuestion;
