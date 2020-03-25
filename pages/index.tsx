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
    Router.push(`/game/${gameDetails.identifier}`);
  };

  const joinGame = () => {
    Router.push("/game/join");
  };

  return (
    <div className="bg-dark page">
      <Container className="h-100">
        <Row className="landing-container h-100 align-items-stretch">
          <Col>
            <div className="h-100 d-flex flex-column justify-content-start align-items-center">
              {user.id ? (
                <div className="text-light w-100 text-center">
                  <h2>Hello, {user.name}!</h2>
                  <div className="submit w-100 mb-3">
                    <Button
                      variant="primary"
                      onClick={() => joinGame()}
                      className="w-100"
                    >
                      Join Game
                    </Button>
                  </div>
                  <div className="submit w-100 mb-3">
                    <ButtonWithLoader
                      buttonVariant="primary"
                      buttonText="Start New Game"
                      onClick={() => newGame()}
                      className="w-100 mb-4"
                      isLoading={isCreatingGame}
                    />
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
