// profileVisibilityReducer.js
import { TOGGLE_PROFILE_VISIBILITY, SET_USER } from "@/app/actionTypes";
import secureLocalStorage from "react-secure-storage";
// Define a function to get the initial state
const getInitialState = () => {
  // Check if running in a browser environment
  if (typeof window !== "undefined") {
    const isVisible = localStorage.getItem("token") ? false : true;
    return { isVisible, user: JSON.parse(secureLocalStorage.getItem("user")) };
  }
  // Default initial state if not in a browser environment
  return { isVisible: true, user: null };
};

// Use the function to set the initial state
const initialState = getInitialState();

const profileVisibilityReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_PROFILE_VISIBILITY:
      return {
        ...state,
        isVisible: !state.isVisible,
      };
    case SET_USER:
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};

export default profileVisibilityReducer;
