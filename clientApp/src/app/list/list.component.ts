import { Component, OnInit } from '@angular/core';
import { RestService } from '../rest.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  dataList = [];
  constructor(private objService: RestService, private router: Router) { }

  ngOnInit(): void {
    this.getDataList();
  }

  getDataList(): void {
    this.objService.getDataList().subscribe((resp: any) => {
      debugger;
      this.dataList = resp;
      console.log(this.dataList);
    });
  }

  add(): void {
    this.router.navigate(['/add']);
  }

  delete(id): void {
    this.objService.deleteData(id).subscribe((resp: any) => {
      if (resp.success) {
        alert("Deleted successfully");
        this.getDataList();
      }
      console.log(resp);
    });
  }
}
