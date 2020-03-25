import React, { useState, MouseEvent } from "react";
import keyBy from "lodash/keyBy";
import { Row, Col, Button } from "react-bootstrap";
import { Game, User, Question, Answer } from "../../../api/interface";
import { sendAnswer } from "../../../api/questions";
import { voteForAnswer } from "../../../api/answer";

interface GameProps {
  game: Game;
  user: User;
  onQuestionAnswered: () => void;
}

const GameQuestion: React.FC<GameProps> = ({
  game,
  user,
  onQuestionAnswered
}) => {
  const [answer, setAnswer] = useState("");
  const currentQuestion: Question = game.questions.find(
    question => question.status === "answering" || question.status === "voting"
  );

  console.log({ currentQuestion });

  const updateAnswer = answer => {
    setAnswer(answer);
  };

  const submitAnswer = e => {
    console.log("Submit Answer");
    sendAnswer(currentQuestion.id, answer);
    onQuestionAnswered();
  };

  const castVote = async answerId => {
    console.log("Submit Vote");
    await voteForAnswer(answerId);
    onQuestionAnswered();
  };

  const usersWhoAnswered = () => (
    <div className="users-answered">
      {currentQuestion.answers.map((answer: Answer, index) => (
        <p className="mb-3" key={index}>
          {answer.user.name}
        </p>
      ))}
    </div>
  );

  const getQuestionState = () => {
    const answersMap = keyBy(currentQuestion.answers, "user.id", {});
    const userHasAnswered =
      currentQuestion.answers.length > 0 && !!answersMap[user.id];

    // show the input box till the user has answered
    if (!userHasAnswered) {
      return (
        <>
          <Row>
            <Col>
              <h3 className="mb-4">{currentQuestion.questionStr}</h3>
              <textarea
                className="answer"
                onChange={e => updateAnswer(e.target.value)}
              ></textarea>
              <Button
                variant="secondary"
                onClick={submitAnswer}
                className="w-100 my-3"
              >
                Submit
              </Button>
            </Col>
          </Row>
          <Row>
            <Col>
              <h3 className="mb-4">Already done:</h3>
              {usersWhoAnswered()}
            </Col>
          </Row>
        </>
      );
    }

    // if the question is marked as voting, then we need to wait till all participants have answered
    if (game.participants.length === currentQuestion.answers.length) {
      // show voting with users who voted
      return (
        <>
          <h3 className="mb-4">Pick your favourite answer</h3>
          <div className="users-answered">
            {currentQuestion.answers.map((answer: Answer, index) => {
              if (answer.user.id === user.id) {
                return (
                  <p className="mb-3 non-clickable-answer" key={index}>
                    {answer.answerStr}
                  </p>
                );
              }

              return (
                <p
                  className="mb-3 clickable-answer"
                  onClick={e => {
                    castVote(answer.id);
                  }}
                  key={index}
                >
                  {answer.answerStr}
                </p>
              );
            })}
          </div>
        </>
      );
    }

    return (
      <>
        <h3 className="mb-4">Let's wait till everyone else is done...</h3>
        {usersWhoAnswered()}
      </>
    );
  };

  return <>{getQuestionState()}</>;
};

export default GameQuestion;
