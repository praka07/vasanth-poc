import { Action } from '@ngrx/store';
import { userModel } from '../../model/user.model';

export class setUserDetailsAction implements Action {
  readonly type = "setUsersName";

  constructor(public objData: userModel) { }
}

export class setNotificationCountAction implements Action {
  readonly type = "setNotificationCount";

  constructor(public objData: userModel) { }
}

export type all = setUserDetailsAction | setNotificationCountAction;
