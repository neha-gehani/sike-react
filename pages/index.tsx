import React, { useState, useEffect } from "react";
import { NextPage } from "next";
import { Container, Row, Col, Button } from "react-bootstrap";
import { createGame } from "../api/game";
import { User } from "../api/interface";
import Router from "next/router";
import { LayoutPageProps } from "./_app";
import { getUser } from "../api/user";
import { useSelector, useDispatch } from "react-redux";
import { InitialState } from "../store";
import { updateUserStore } from "../states/user/actions";
import ButtonWithLoader from "../components/global/ButtonWithLoader";

interface StateProps {
  user: User;
}

const Home: NextPage<LayoutPageProps> = props => {
  const [isCreatingGame, setIsCreatingGame] = useState(false);
  const { user } = useSelector<InitialState, StateProps>(
    (state: InitialState) => {
      return {
        user: state.user
      };
    }
  );
  let hasFetchedUser = false;

  const dispatch = useDispatch();

  const setUser = userData => {
    dispatch(updateUserStore(userData));
  };

  const fetchUser = async () => {
    const userData = await getUser();
    if(!userData){
      Router.push('/login')
    }
    hasFetchedUser = true;
    setUser(userData);
  };

  useEffect(() => {
    fetchUser();
  }, [hasFetchedUser]);

  const newGame = async () => {
    setIsCreatingGame(true);
    const gameDetails = await createGame();
    setIsCreatingGame(false);
    Router.push("/game/[gameId]", `/game/${gameDetails.identifier}`);
  };

  const joinGame = () => {
    Router.push("/game/join");
  };

  return (
    <div className="page">
      <Container>
        <Row className="landing-container align-items-stretch">
          <Col>
            <div className="d-flex flex-column justify-content-start">
              {user.id ? (
                <div className="w-100">
                  <h4>Hey {user.name}!</h4>
                  <p className="lead">Start a new game or join an existing game started by a friend.</p>
                  <div className="submit w-100 mb-2">
                    <ButtonWithLoader
                      buttonVariant="primary"
                      buttonText="Start New Game"
                      onClick={() => newGame()}
                      className="w-100"
                      isLoading={isCreatingGame}
                    />
                  </div>
                  <div className="submit w-100 mb-2">
                    <Button
                      variant="secondary"
                      onClick={() => joinGame()}
                      className="w-100"
                    >
                      Join Game
                    </Button>
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Home;
