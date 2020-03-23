import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class DataService {
  constructor(private http: HttpClient) {}

  get(url: string, params?: any): Observable<Response> {
    const options = {};
    this.setHeaders(options);

    return this.http.get(url, options).pipe(
      // retry(3), // retry a failed request up to 3 times
      tap((res: Response) => {
        return res;
      }),
      catchError(this.handleError)
    );
  }

  post(url: string, data: any, params?: any): Observable<Response> {
    return this.doPost(url, data, params);
  }

  postForm(url: string, data: any, params?: any): Observable<Response> {
    return this.doPost(url, data, params, true);
  }

  private doPost(
    url: string,
    data: any,
    params?: any,
    isForm?: boolean
  ): Observable<Response> {
    const options = {};
    this.setHeaders(options, isForm);

    return this.http.post(url, data, options).pipe(
      tap((res: Response) => {
        return res;
      }),
      catchError(this.handleError)
    );
  }

  delete(url: string, params?: any) {
    const options = {};
    this.setHeaders(options);

    console.log("data.service deleting");

    this.http.delete(url, options).subscribe(res => {
      console.log("deleted");
    });
  }

  private handleError(error: any) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error("Client side network error occurred:", error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        "Backend - " +
          `status: ${error.status}, ` +
          `statusText: ${error.statusText}, ` +
          `message: ${error.error.message}`
      );
    }

    // return an observable with a user-facing error message
    return throwError(error || "server error");
  }

  private doPut(
    url: string,
    data: any,

    params?: any
  ): Observable<Response> {
    const options = {};
    this.setHeaders(options);

    return this.http.put(url, data, options).pipe(
      tap((res: Response) => {
        return res;
      }),
      catchError(this.handleError)
    );
  }

  private setHeaders(options: any, isForm?: boolean) {
    if (isForm) {
      options["responseType"] = "application/json";
    } else {
      options["headers"] = new HttpHeaders().append(
        "content-type",
        "application/json"
      );
    }

    // if (needId && this.securityService) {
    //     options['headers'] = new HttpHeaders()
    //         .append('authorization', 'Bearer ' + this.securityService.GetToken())
    //         .append('x-requestid', Guid.newGuid());
    // } else if (this.securityService) {
    //     options['headers'] = new HttpHeaders()
    //         .append('authorization', 'Bearer ' + this.securityService.GetToken());
    // }
  }
}
