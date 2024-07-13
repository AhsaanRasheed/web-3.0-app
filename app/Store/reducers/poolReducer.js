// poolReducer.js

const initialState = {
  selectedPool: "Total",
};

const poolReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_CLAIM_GRAPH_POOL":
      console.log(action);
      return {
        ...state,
        selectedPool: action.payload,
      };
    default:
      return state;
  }
};

export default poolReducer;
