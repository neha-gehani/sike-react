import React, { useState, MouseEvent, useEffect } from "react";
import { Row, Col, ListGroup, Badge } from "react-bootstrap";
import { Answer, Game, User, Question } from "../../../api/interface";
import { sendAnswer } from "../../../api/questions";
import { voteForAnswer } from "../../../api/answer";

interface VotingProps {
  user: User;
  currentQuestion: Question;
  // onQuestionAnswered: () => void;
}

const Voting: React.FC<VotingProps> = ({
  currentQuestion,
  user,
  // onQuestionAnswered
}) => {

  const [answer, setAnswer] = useState("");
  const submitAnswer = e => {
    console.log("Submit Answer");
    sendAnswer(currentQuestion.id, answer);
    // onQuestionAnswered();
  };
 
  return (
    <>
      <Row className="voting-answers">
        <Col>
          <h3 className="mb-4">Pick your favourite answer</h3>
          <ListGroup variant="flush">
            {currentQuestion.answers.map((answer: Answer, index) => {
              if (answer.user.id === user.id) {
                return (
                  <ListGroup.Item>
                    {answer.answerStr} 
                    <Badge variant="secondary">your-answer</Badge>
                    </ListGroup.Item>
                );
              }

              return (
                <ListGroup.Item
                  onClick={e => {
                    console.log('vote for', answer.id)
                    // castVote(answer.id);
                  }}>{answer.answerStr}</ListGroup.Item>
              );
            })}
          </ListGroup> 
        </Col>
      </Row>
      <div className="users-answered">
         
      </div>
    </>
  );
};

export default Voting;