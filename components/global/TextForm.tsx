import React, { useState, MouseEvent } from "react";
import { Button } from "react-bootstrap";

interface TextFormProps {
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
  onTextUpdated: (param: string) => void;
  headerText?: string;
  placeholder: string;
  buttonText: string;
}

const TextForm: React.FC<TextFormProps> = ({
  onClick,
  onTextUpdated,
  headerText,
  placeholder,
  buttonText
}) => {
  const [text, setText] = useState("");

  const updateText = text => {
    setText(text);
    onTextUpdated(text);
  };

  return (
    <>
      {headerText && <h2 className="my-4 text-light">{headerText}</h2>}
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
        <Button variant="primary" onClick={onClick} className="w-100">
          {buttonText}
        </Button>
      </div>
    </>
  );
};

export default TextForm;
