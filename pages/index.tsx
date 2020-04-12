import React, { useState } from "react";
import { NextPage } from "next";
import { Container, Row, Col, Button, Alert } from "react-bootstrap";
import { createGame } from "../api/game";
import { User } from "../api/interface";
import Router, { useRouter } from "next/router";
import { LayoutPageProps } from "./_app";
import { useSelector } from "react-redux";
import { InitialState } from "../store";
import ButtonWithLoader from "../components/global/ButtonWithLoader";
import AuthenticatedRoute from "../components/global/AuthenticatedRoute";
import { ApiError } from "../api/httpClient";

interface StateProps {
  user: User;
}

const Home: NextPage<LayoutPageProps> = props => {
  const router = useRouter();
  const [isCreatingGame, setIsCreatingGame] = useState(false);
  const [error, setError] = useState<String>(undefined);

  const { user } = useSelector<InitialState, StateProps>(
    (state: InitialState) => {
      return {
        user: state.user
      };
    }
  );

  const newGame = async () => {
    setIsCreatingGame(true);
    await createGame()
      .then(gameDetails => {
        setError("");
        setIsCreatingGame(false);
        router.push("/game/[gameId]", `/game/${gameDetails.identifier}`);
      })
      .catch(err => {
        setIsCreatingGame(false);
        setError((err as ApiError).response.message);
      });
  };

  const joinGame = () => {
    router.push("/game/join");
  };

  return (
    <div className="page">
      <AuthenticatedRoute />
      <Container className="h-100">
        <Row className="landing-container h-100 align-items-stretch">
          <Col>
            <div className="h-100 d-flex flex-column justify-content-start align-items-center">
              {error && (
                <Alert variant="danger" className="w-100">
                  {error}
                </Alert>
              )}
              {user.id ? (
                <div className="w-100 text-center">
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
