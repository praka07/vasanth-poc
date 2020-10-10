import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { RestService } from '../rest.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userName = ""; psd = ""; pin = "";

  constructor(private objService: RestService, private router: Router) { }

  ngOnInit(): void {
  }


  login(event) {
    event.preventDefault();
    const target = event.target;
    console.log(event);
    console.log(this.userName);
    let objDat = {
      username: this.userName,
      password: this.psd,
      pin: this.pin
    }
    var res = this.objService.login(objDat).subscribe((data: any) => {
      if (data.status === "s") {
        alert("Logged in successfully");
        this.router.navigate(['/list/']);
      }
      console.log("Data"); console.log(data);
    },
      (err: any) => {        
        alert("Invalid credentials");
        console.log("error "); console.log(err);
      });
    console.log("result");
    console.log(res);
  }

}
