import { Action } from '@ngrx/store';

export function DataReducer(state: string = "Guest", action: Action) {
  
  switch (action.type) {
    case "setUserName":
      return state = "Vijay ";
      break;
    default:
      return state;
       
  }


}
