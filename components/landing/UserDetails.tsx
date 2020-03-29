import React, { useState, MouseEvent } from "react";
import { Button } from "react-bootstrap";

interface UserDetailsProps {
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
  onNameUpdated: (param: string) => void;
}

const UserDetails: React.FC<UserDetailsProps> = ({
  onClick,
  onNameUpdated
}) => {
  const [name, setName] = useState("");

  const updateName = name => {
    setName(name);
    onNameUpdated(name);
  };

  return (
    <>
      <h2 className="mt-2 text-light">Welcome :)</h2>
      <div className="name w-100 mb-3">
        <input
          className="form-control"
          type="text"
          maxLength={15}
          value={name}
          onChange={e => updateName(e.target.value)}
          placeholder="Enter your display name..."
        />
      </div>
      <div className="submit w-100 mb-3">
        <Button variant="primary" onClick={onClick} className="w-100">
          Let's go!
        </Button>
      </div>
    </>
  );
};

export default UserDetails;
