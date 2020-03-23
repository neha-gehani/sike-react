export interface User {
  name?: string;
  id: number;
  token?: string;
  role?: string;
}

export interface Game {
  identifier: string;
  user: User;
  id: number;
  participants: any[];
}
