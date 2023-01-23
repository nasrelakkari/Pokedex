export interface Register {
  username: string;
  password: string;
  email: string;
}

export interface Login {
  username: string;
  password: string;
}

export interface User {
  email: string;
  id: number;
  username: string;
}
