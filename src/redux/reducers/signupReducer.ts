import { Reducer } from "@reduxjs/toolkit";
import { SUBMIT_FORM, SignupFormState } from "../interfaces/interfaces";

const initialstate: SignupFormState = {
  users: [],
};

const signupFormReducer: Reducer = (state = initialstate, action) => {
  switch (action.type) {
    case SUBMIT_FORM:
      return {
        ...state,
        users: [...state.users, action.payload],
      };

    default:
      return state;
  }
};
export default signupFormReducer;