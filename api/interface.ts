export interface User {
  name?: string;
  id: number;
  token?: string;
  role?: string;
}

export interface Participant {
  id: number;
  name: string;
}

export interface Answer {
  id: number;
  answerStr: string;
  user?: User
}

export interface Question {
  id: number;
  questionStr: string;
  status: string;
  answer?: Answer[]
}

export interface Game {
  [x: string]: any;
  identifier: string;
  user: User;
  id: number;
  participants: Participant[];
  questions?: Question[];
  status: "created" | "active";
}
