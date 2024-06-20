export interface LoginFormState {
  email: string;
  username: string;
  role: string;
  isLoggedIn: boolean;
}

export interface FormData {
  username: string;
  name: string;
  email: string;
  password: string;
}

export interface SignupFormState {
  users: FormData[];
}
export interface LoginFormState {
  username: string;
  email: string;
  isLoggedIn: boolean;
  role: string;
}


export interface AppState {
  loginForm: LoginFormState;
}

export interface ProductFormData {
  name: string;
  description: string;
  productImage: string;
  price: string;
  stock: string;
  category: string;
  owner: string;
}

export const SUBMIT_FORM = "SUBMIT_FORM";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
