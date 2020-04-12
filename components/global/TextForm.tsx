import React, { useState, MouseEvent, useEffect } from "react";
import classnames from "classnames";
import ButtonWithLoader from "./ButtonWithLoader";

interface TextFormProps {
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
  onTextUpdated: (param: string) => void;
  headerText?: string;
  placeholder: string;
  buttonText: string;
  isLoading?: boolean;
  initialValue?: string | string[];
  errorText?: string;
}

const TextForm: React.FC<TextFormProps> = ({
  onClick,
  onTextUpdated,
  headerText,
  placeholder,
  buttonText,
  isLoading,
  initialValue,
  errorText
}) => {
  const [text, setText] = useState(initialValue || "");

  const updateText = text => {
    setText(text);
    onTextUpdated(text);
  };

  return (
    <>
      {headerText && <h2 className="my-4">{headerText}</h2>}
      <div className="name w-100 mb-3">
        <input
          className={classnames(["form-control"], {
            "is-invalid": errorText && errorText.length > 0
          })}
          type="text"
          maxLength={15}
          value={text}
          onChange={e => updateText(e.target.value)}
          placeholder={placeholder}
        />
        {errorText && <div className="invalid-feedback">{errorText}</div>}
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
