import { Injectable, Inject } from "@angular/core";
import { IUserDetails } from "../shared/models/userdetail.model";
import { DataService } from "../shared/service/data.service";
import { tap } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class UserDetailService {
  private _baseURL: any;
  constructor(
    private _service: DataService,
    @Inject("BASE_URL") baseUrl: string
  ) {
    this._baseURL = baseUrl;
  }

  GetAll(): Promise<IUserDetails[]> {
    const url = this._baseURL + "user/getall";

    return this._service
      .get(url)
      .pipe<IUserDetails[]>(
        tap((response: any) => {
          return response;
        })
      )
      .toPromise();
  }

  post(model: FormData): Promise<string> {
    const url = this._baseURL + "user";

    return this._service
      .postForm(url, model)
      .pipe<string>(
        tap((response: any) => {
          return response;
        })
      )
      .toPromise();
  }

  downloadFileURL(filename: string): string {
    return `${this._baseURL}User/Download?fileName=${filename}`;
  }
}
