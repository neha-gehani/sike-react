import React, { MouseEvent } from "react";
import classnames from "classnames";
import { Button } from "react-bootstrap";
import InlineLoader from "./InlineLoader";

interface LoaderProps {
  className?: string;
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
  buttonText: string;
  buttonVariant:
    | "primary"
    | "secondary"
    | "success"
    | "danger"
    | "outline-primary";
  isLoading?: boolean;
  isDisabled?: boolean;
}

const ButtonWithLoader: React.FC<LoaderProps> = ({
  className,
  onClick,
  buttonText,
  buttonVariant,
  isLoading,
  isDisabled
}) => {
  return (
    <>
      <Button
        variant={buttonVariant}
        onClick={onClick}
        className={classnames([
          "w-100 d-flex justify-content-center align-items-center button-with-loader",
          className
        ])}
        disabled={isLoading || isDisabled}
      >
        {isLoading ? (
          <InlineLoader
            isDark={
              buttonVariant !== "secondary" &&
              buttonVariant !== "outline-primary"
            }
          />
        ) : (
          buttonText
        )}
      </Button>
    </>
  );
};

export default ButtonWithLoader;
