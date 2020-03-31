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
  user?: User;
  votes?: Vote[];
}

export interface Vote {
  id: number;
  name: string;
}

export interface Question {
  id: number;
  questionStr: string;
  status: string;
  answers?: Answer[];
}

export interface Score {
  score: number;
  user: User;
}

export interface Game {
  identifier: string;
  user: User;
  id: number;
  participants: Participant[];
  questions?: Question[];
  scores?: Score[];
  status: "created" | "active" | "abandoned" | "finished";
}
