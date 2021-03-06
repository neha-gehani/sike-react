import React, { useState } from "react";
import flatten from "lodash/flatten";
import { Row, Col, ListGroup, Badge, Button, Alert } from "react-bootstrap";
import { Answer, Vote, User, Question } from "../../../api/interface";
import { voteForAnswer } from "../../../api/answer";
import { ApiError } from "../../../api/httpClient";

interface VotingProps {
  user: User;
  currentQuestion: Question;
  // onQuestionAnswered: () => void;
}

const Voting: React.FC<VotingProps> = ({
  currentQuestion,
  user
  // onQuestionAnswered
}) => {
  const [error, setError] = useState<String>(undefined);
  let selectedAnswerTemp = 0;
  let voteStateTemp = "default";

  const castVote = async answerId => {
    // set an interim state while the API call happens
    setSelectedAnswer(answerId);
    setVoteState("answering");

    // make the API call to cast the vote
    await voteForAnswer(answerId)
      .then(answer => {
        setError("");

        // update the state to done
        setVoteState("answered");
      })
      .catch(err => {
        setError((err as ApiError).response.message);
      });
  };

  const getVoteState: (state: string, data: any) => void = function(
    state,
    data
  ) {
    if (state === "answering") {
      return (
        <>
          <Badge variant="secondary">Voting</Badge>
        </>
      );
    }
    return (
      <>
        <Badge variant="success">Done</Badge>
      </>
    );
  };

  // Vote can have 3 states default | answering | answered
  // This function is called only if the state is not default
  const getVoteByState = answer => {
    if (answer.id === selectedAnswer) {
      return getVoteState(voteState, { answer, selectedAnswer });
    }
    return <></>;
  };

  // prepare a list of all the people who have voted
  const peopleVoted = flatten(
    currentQuestion.answers.map((answer: Answer) => {
      const names = answer.votes.map((vote: Vote, index) => {
        if (vote.name === user.name) {
          voteStateTemp = "answered";
          selectedAnswerTemp = answer.id;
        }
        return vote;
      });
      return names;
    })
  );

  const [voteState, setVoteState] = useState(voteStateTemp);
  const [selectedAnswer, setSelectedAnswer] = useState(selectedAnswerTemp);

  return (
    <>
      <Row className="voting-answers">
        <Col>
          {error && <Alert variant="danger">{error}</Alert>}
          <h3 className="mb-4">Pick your favourite answer</h3>
          <ListGroup variant="flush">
            {currentQuestion.answers.map((answer: Answer, index) => {
              if (answer.user.id === user.id) {
                return (
                  <ListGroup.Item key={index}>
                    {answer.answerStr}
                    <Badge
                      className="users-answer"
                      variant="secondary"
                      key={index}
                    >
                      your-answer
                    </Badge>
                  </ListGroup.Item>
                );
              }

              return (
                <ListGroup.Item key={index}>
                  {answer.answerStr}
                  {voteState === "default" ? (
                    <>
                      <Button
                        variant="primary"
                        className="btn-small"
                        onClick={e => {
                          castVote(answer.id);
                        }}
                      >
                        Vote
                      </Button>
                    </>
                  ) : (
                    getVoteByState(answer)
                  )}
                </ListGroup.Item>
              );
            })}
          </ListGroup>
        </Col>
      </Row>
      <Row className="users-answered">
        <Col>
          <h3 className="mb-4">Already done:</h3>
          <div className="users-answered">
            {peopleVoted.map((person: User, index) => (
              <p className="mb-3" key={index}>
                {person.name}
              </p>
            ))}
          </div>
        </Col>
      </Row>
    </>
  );
};

export default Voting;
