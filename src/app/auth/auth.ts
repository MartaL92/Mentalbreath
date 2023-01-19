export interface Signup {
  id: number
  name: string;
  surname: string;
  email: string;
  password: string;
  role: string;
}

export interface AuthData {
  accessToken: string;
  user: {
    email: string;
    id: number;
    name: string;
    surname: string;
    role: string;
  };
}
