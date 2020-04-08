export const types = (type) => dispatch => {
    
    dispatch({
        type: 'TYPE',
        whichType: type
    })
  };