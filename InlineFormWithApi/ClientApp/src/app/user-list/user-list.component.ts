import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  selectedFile: File = null;
  private newUserForm: FormGroup;
  userList: IUserDetails[] = [];
  baseURL: any;
  enebleAdd = false;
  constructor(private http: HttpClient, @Inject('BASE_URL')  baseUrl: string, fb: FormBuilder) {

    this.newUserForm = fb.group({
      'FirstName': [null, Validators.required],
      'SecondName': [null, Validators.required],
      'Age': [null, Validators.required],
      'Photo': [null],

  });

this.baseURL = baseUrl;
this.loadAllUsers();

  }


  ngOnInit() {


  }


  addNewRecord()
  {
this.enebleAdd = true;
  }
  onSelectFile(fileInput: any) {
    this.selectedFile = <File>fileInput.target.files[0];
  }

  loadAllUsers() {
  this.http.get<IUserDetails[]>(this.baseURL + 'User/GetAll').subscribe(result => {
    this.userList = result;
  }, error => console.error(error));
 }

  onSubmit(form: FormGroup) {
if(form.valid)
{
  const data = form.value;
  const formData = new FormData();
    formData.append('FirstName', data.FirstName);
    formData.append('SecondName', data.SecondName);
    formData.append('Age', data.Age);
    formData.append('Photo', this.selectedFile);

    this.http.post(this.baseURL + 'User', formData,{responseType: 'text'})
    .subscribe(res => {
      alert('Record Saved !!');
      this.enebleAdd = false;
      this.loadAllUsers();
    }, error => {
         console.log('Error!');
    });

    this.newUserForm.reset();




}
else
{
  form.markAllAsTouched();
}

  }

  onCancelClick()
  {
    this.newUserForm.reset();
    this.enebleAdd= false;

  }

  downloadImage(guid: string, imageType: string)
  {
    const fileName = `${guid}.${imageType}`;
    window.open(`${this.baseURL }User/Download?fileName=${fileName}`);
  }
}

interface IUserDetails {
 firstName: string;
 secondName: string;
 age: number;
 photo: File;
 photoGuidId: string;
 imageFileType: string;
}


