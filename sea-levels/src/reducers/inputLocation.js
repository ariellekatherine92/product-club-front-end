
const locationReducer = (state = '', action) => {
  switch (action.type) {
    case "ADD_LOCATION":
      return state = action.payload;
    default:
      return state;
  }
};
export default locationReducer;
