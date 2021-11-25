import * as actionType from '../constants/actionTypes';

const authReducer = (state = [], action) => {
  switch (action.type) {
    case actionType.POST_ATTENDANCE:
      return { ...state, state: action.payload.data };

    case actionType.GET_STUDENT:
      
        return  state.unshift(action.data.data)
    case actionType.RESET_STUDENT:
        
        return [];
    case actionType.UPDATE_STUDENT :
       return [];
    case actionType.GET_ATTENDANCE:
      
        return state.unshift(action.data.data)
    default:
      return state;
  }
};

export default authReducer;
