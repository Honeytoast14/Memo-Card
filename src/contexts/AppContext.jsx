/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { createContext, useContext, useReducer } from "react";

const BASE_URL = `http://localhost:5000`;

const initState = {
  user: null,
  memos: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, user: action.payload };
    case "LOGOUT":
      localStorage.clear();
      return { ...state, user: null };
    case "CREATE_CARD":
      return { ...state, memos: [...state.memos, action.payload] };
    case "GET_CARDS":
      localStorage.setItem("memos", JSON.stringify(action.payload.memos));
      return { ...state, memos: action.payload.memos };
    default:
      return state;
  }
};

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initState);

  const login = async (username, password) => {
    try {
      const response = await axios.post(`${BASE_URL}/auth/login`, {
        username,
        password,
      });

      if (response.data.token) {
        const decodedToken = jwtDecode(response.data.token);
        dispatch({ type: "LOGIN", payload: decodedToken });
        localStorage.setItem("login-token", response.data.token);
        return { success: true };
      }
    } catch (error) {
      console.error("Error: ", error);
      return {
        success: false,
        message: "Invalid username or password",
      };
    }
  };

  const getCards = async () => {
    try {
      const memos = localStorage.getItem("memos");
      if (memos) {
        dispatch({ type: "GET_CARDS", payload: JSON.parse(memos) });
        return { success: true };
      }

      const response = await axios.get(`${BASE_URL}/memos`);
      if (response.data) {
        dispatch({ type: "GET_CARDS", payload: response.data });
        return { success: true };
      }
    } catch (error) {
      console.error("Error fetching cards: ", error);
      return { success: false, message: "Failed to fetch memos" };
    }
  };

  const createCard = async (newCard) => {
    try {
      const currentMemos = JSON.parse(localStorage.getItem("memos"));
      currentMemos.push(newCard);
      localStorage.setItem("memos", JSON.stringify(currentMemos));

      dispatch({ type: "CREATE_CARD", payload: newCard });

      return { success: true };
    } catch (error) {
      console.error("Error creating card: ", error);
      return { success: false, message: "Failed to create memo" };
    }
  };

  return (
    <AppContext.Provider
      value={{ state, dispatch, login, getCards, createCard }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
