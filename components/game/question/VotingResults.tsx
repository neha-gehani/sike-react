import React from "react";
import flatten from 'lodash/flatten';
import differenceBy from 'lodash/differenceBy';
import { Row, Col, ListGroup, Badge, Button } from "react-bootstrap";
import { Answer, Vote, User, Question } from "../../../api/interface";

interface VotingResultsProps {
  user: User;
  participants: User[];
  currentQuestion: Question;
}


const VotingResults: React.FC<VotingResultsProps> = ({
  currentQuestion,
  user,
  participants
}) => {

  const userVoted = currentQuestion.answers.find((answer: Answer) => {
    return answer.votes.find((vote: Vote) => vote.id === user.id)
  });

  const peopleVoted = flatten(currentQuestion.answers.map((answer: Answer) => {
    return answer.votes
  }));

  const peopleWhoHaveNotVoted = differenceBy(participants, peopleVoted, 'id')
  
  const userSiked = flatten(currentQuestion.answers.map((answer: Answer) => {
    // find users answer and return the votes array that contains the list of users who voted
    return answer.user.id === user.id ? answer.votes : [];
  })).filter((user) => user !== undefined )

  return (
    <>
      <Row className="user-siked-by">
        <Col>
          <h3 className="mb-4">You picked <Badge variant='primary' className='dont-break-out'>{userVoted.user.name}'s</Badge> answer</h3>
        </Col>
      </Row>
      <Row className="user-siked">
        <Col>
          <h3 className="mb-4">{ userSiked.length === 0 ? "Let's wait to see who picks your answer" : "People who picked your answer..." }</h3>
          <ListGroup variant="flush">
            {userSiked.map((person: User, index) => {
              return (
                <ListGroup.Item key={index}>
                  {person.name}
                </ListGroup.Item>
              );
            })}
          </ListGroup> 
        </Col>
      </Row>
      <Row className="users-answered">
        <Col>
          <h3 className="mb-4">Still waiting on:</h3>
          <div className="users-answered">
            {peopleWhoHaveNotVoted.map((person: User, index) => (
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

export default VotingResults;