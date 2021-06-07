import { combineReducers } from 'redux';

import attendance from './attendance'
import auth from './auth';

export const reducers = combineReducers({ auth  , attendance});
