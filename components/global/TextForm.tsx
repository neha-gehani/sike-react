import React, { useState, MouseEvent, useEffect } from "react";
import { Button } from "react-bootstrap";
import ButtonWithLoader from "./ButtonWithLoader";

interface TextFormProps {
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
  onTextUpdated: (param: string) => void;
  headerText?: string;
  descriptionText?: string;
  placeholder: string;
  buttonText: string;
  isLoading?: boolean;
  initialValue?: string | string[];
}

const TextForm: React.FC<TextFormProps> = ({
  onClick,
  onTextUpdated,
  headerText,
  descriptionText,
  placeholder,
  buttonText,
  isLoading,
  initialValue
}) => {
  const [text, setText] = useState(initialValue || "");

  const updateText = text => {
    setText(text);
    onTextUpdated(text);
  };

  return (
    <>
      {headerText && <h4 className="mt-3">{headerText}</h4>}
      {descriptionText && <p className="lead">{descriptionText}</p>}
      <div className="name w-100 mb-3">
        <input
          className="form-control"
          type="text"
          maxLength={15}
          value={text}
          onChange={e => updateText(e.target.value)}
          placeholder={placeholder}
        />
      </div>
      <div className="submit w-100 mb-3">
        <ButtonWithLoader
          buttonVariant="primary"
          onClick={onClick}
          className="w-100"
          isLoading={isLoading}
          buttonText={buttonText}
        />
      </div>
    </>
  );
};

export default TextForm;
