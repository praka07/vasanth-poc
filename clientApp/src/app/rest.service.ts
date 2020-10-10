import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/internal/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

const endpoint = 'http://localhost:5050/';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(private http: HttpClient) { }

  private extractData(res: Response): any {
    const body = res;
    return body || {};
  }

  private handleError(error: HttpErrorResponse): any {
    console.log("error");
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  }

  getDataList(): Observable<any> {
    return this.http.get(endpoint + 'DataList').pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  getIndivData(id): Observable<any> {
    return this.http.get(endpoint + 'DataSelect/'+id).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  addData(objDat): Observable<any> {
    return this.http.post(endpoint + 'add', objDat).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  deleteData(id): Observable<any> {
  
    debugger;
    return this.http.delete(endpoint + 'DataDelete/' + id).pipe(      
      catchError(this.handleError)
    );
  }

  updateData(objDat): Observable<any> {

    debugger;
    return this.http.patch(endpoint + 'DataUpdate/' + objDat.id, objDat).pipe(
      catchError(this.handleError)
    );
  }

  login(objDat): Observable<any> {
    debugger;
    return this.http.post(endpoint + 'login', objDat, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }).pipe(
      //map(this.extractData),      
      catchError(this.handleError)
    );
  }
}
