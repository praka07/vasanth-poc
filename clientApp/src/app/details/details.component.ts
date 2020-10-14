import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RestService } from '../rest.service';
//import { NgModule } from '@angular/core';
//import { MatDialogModule, MatButtonModule } from '@angular/material';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  id: string;
  indiv: {
    id: "",
    name: "",
    descrip: ""
  };

  constructor(private objService: RestService, private route: ActivatedRoute, public dialog: MatDialog, private router: Router) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.getIndivData();
  }

  getIndivData() {
    this.objService.getIndivData(this.id).subscribe((resp: any) => {
      debugger;
      this.indiv = resp;
      console.log(this.indiv);
    });
  }

  edit(): void {
    const dialogRef = this.dialog.open(UpdateProduct, {
      data: this.indiv
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      //console.log(JSON.parse(result));
      this.objService.updateData(result).subscribe((resp: any) => {
        debugger;
        if (resp.success) {
          alert("Updated successfully");
          this.router.navigate(['/list/']);
        }
        //this.indiv = resp;
        //console.log(this.indiv);
      });

      console.log(`Dialog result: ${result}`);
    });

    //const dialogRef = this.dialog.open(UpdateProduct, {
    //  width: '500px',
    //  data: this.indiv // { name: this.name, descrip: this.descrip }
    //});

    //dialogRef.afterClosed().subscribe(result => {
    //  console.log('The dialog was closed');
    //  this.indiv = result;
    //});
  }

}

@Component({
  selector: 'dialog-content-example-dialog',
  templateUrl: 'UpdateProduct.html',
})

export class UpdateProduct{
  constructor(
    public dialogRef: MatDialogRef<UpdateProduct>,
    @Inject(MAT_DIALOG_DATA)
    public data: any) {
    console.log("dialog cnstr");
  }

  onNoClick(): void {
    this.dialogRef.close(); //.close();
  }  
}


//@Component({
//  selector: 'dialog-overview-example-dialog',
//  templateUrl: 'updateProduct.html' // './ dialog-overview-example-dialog.html',
//})
//export class UpdateProduct {

//  constructor(
//    public dialogRef: MatDialogRef<UpdateProduct>,
//    //@Inject(MAT_DIALOG_DATA)
//    public data: any) {
//    console.log("dialog cnstr");
//  }

//  onNoClick(): void {
//    this.dialogRef.close();
//  }

//}
