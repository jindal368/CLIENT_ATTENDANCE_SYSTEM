import * as actionType from '../constants/actionTypes';

const authReducer = (state = [], action) => {
  switch (action.type) {
    case actionType.POST_ATTENDANCE:
      return { ...state, state: action.payload.data };

    case actionType.GET_STUDENT:
        
        return {...state , state :state.push(action.data.data)}
    
    default:
      return state;
  }
};

export default authReducer;
