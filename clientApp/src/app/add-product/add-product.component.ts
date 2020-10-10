import { Component, OnInit } from '@angular/core';
import { RestService } from '../rest.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  objDat = {
    name: "",
    descrip: ""
  };

  constructor(private objService: RestService, private router: Router) { }

  ngOnInit(): void {
  }

  add(e) {
    e.preventDefault();
    var res = this.objService.addData(this.objDat).subscribe((data: any) => {
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
  }
}
