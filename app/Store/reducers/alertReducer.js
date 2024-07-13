// reducers.js
const initialState = {
  alertType: null,
  text: "",
  top: "",
  isOpen: false,
};

const alertReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SHOW_ALERT":
      return {
        ...state,
        alertType: action.payload.alertType,
        text: action.payload.text,
        top: action.payload.top,
        isOpen: true,
      };
    case "HIDE_ALERT":
      return {
        ...state,
        isOpen: false,
      };
    default:
      return state;
  }
};

export default alertReducer;
