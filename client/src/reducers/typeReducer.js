
const initialState = {
    type: 'home'
  };
  
  export default function(state = initialState, action) {
    switch (action.type) {
      case 'TYPE':
        return {
          ...state,
          type: action.whichType
        };
      default:
        return state;
    }
  }