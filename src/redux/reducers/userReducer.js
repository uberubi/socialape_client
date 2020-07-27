import { SET_ERRORS, SET_USER, CLEAR_ERRORS, LOADING_UI, SET_AUTHENTICATED, SET_UNAUTHENTICATED } from "../types";
import axios from "axios";

const initialState = {
  authenticated: false,
  credentials: {},
  likes: [],
  notifications: []
}

export default function (state = initialState, action)  {
  switch (action.type) {
    case SET_AUTHENTICATED:
      return {
        ...state,
        authenticated: true
      };
    case SET_UNAUTHENTICATED:
      return initialState;
    case SET_USER:
      return {
        authenticated: true,
        ...action.payload
      };
    default:
      return state;
  }
}