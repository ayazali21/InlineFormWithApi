import { Component, OnInit, Inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from "@angular/forms";
import { IUserDetails } from "../shared/models/userdetail.model";
import { DataService } from "../shared/service/data.service";
import { UserDetailService } from "./user-detail.service";
import { async } from "rxjs/internal/scheduler/async";

@Component({
  selector: "app-user-list",
  templateUrl: "./user-list.component.html",
  styleUrls: ["./user-list.component.css"]
})
export class UserListComponent implements OnInit {
  selectedFile: File = null;
  private newUserForm: FormGroup;
  userList: IUserDetails[] = [];
  enebleAdd = false;
  constructor(private fb: FormBuilder, private _service: UserDetailService) {
    let userDetail = <IUserDetails>{};
    this.initializeForm(userDetail);

    this.loadAllUsers();
  }

  private initializeForm(model: IUserDetails) {
    this.newUserForm = this.fb.group({
      FirstName: [model.FirstName, Validators.required],
      SecondName: [model.SecondName, Validators.required],
      Age: [model.Age, Validators.required],
      Photo: [null]
    });
  }

  ngOnInit() {}

  addNewRecord() {
    this.enebleAdd = true;
  }
  onSelectFile(fileInput: any) {
    this.selectedFile = <File>fileInput.target.files[0];
  }

  async loadAllUsers() {
    try {
      this.userList = await this._service.GetAll();
    } catch (error) {}
  }

  async onSubmit() {
    if (this.newUserForm.valid) {
      const data = <IUserDetails>this.newUserForm.value;
      const formData = new FormData();
      formData.append("FirstName", data.FirstName);
      formData.append("SecondName", data.SecondName);
      formData.append("Age", data.Age.toString());
      formData.append("Photo", this.selectedFile);

      try {
        let res = await this._service.post(formData);
        alert(res);
        this.loadAllUsers();
        this.newUserForm.reset();
        this.enebleAdd = false;
      } catch (error) {
        debugger;
      }
    } else {
      this.newUserForm.markAllAsTouched();
    }
  }

  onCancelClick() {
    this.newUserForm.reset();
    this.enebleAdd = false;
  }

  downloadImage(guid: string, imageType: string) {
    const fileName = `${guid}.${imageType}`;
    window.open(this._service.downloadFileURL(fileName));
  }
}
