import * as Actions from '../actions/user.action';
import { userModel } from '../../model/user.model';

export type Action = Actions.all;

const defaultState: userModel = {
  userName: 'Guest',
  notification: 0
}

const newState = (state, newData) => {
  return Object.assign({}, state, newData);
}

export function userReducer(state: userModel = defaultState, action: Action) {
  console.log(state, action);
  switch (action.type) {
    //case "setUserName":
    //  return newState(state, { userName: action.objData.userName });
    //  break;

    case "setNotificationCount":
      return newState(state, { notification: action.objData.notification });
      break;
  }
}
