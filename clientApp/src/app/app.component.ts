import { Component } from '@angular/core';

import { Store } from '@ngrx/store';
//import { Observable } from 'rxis/Observable';
import { Observable } from 'rxjs';
import { userModel } from '../model/user.model';

interface AppState {
  userName: string;
  userModel: userModel
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  userName$: Observable<string>;
  userModel$: Observable<userModel>;

  constructor(private store: Store<AppState>) {
    this.userName$ = this.store.select('userName');
    this.userModel$ = this.store.select('userModel');
  }

  login() {
    this.store.dispatch({
      type: "setUserName", name : "Sujay"
    });
  }
  title = 'clientApp';
}
