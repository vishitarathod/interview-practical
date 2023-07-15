import { SharedService } from './../../shared/shared.service';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {
  postCreateForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private http: HttpClient, private toastr: ToastrService,private sharedService: SharedService) { }

  ngOnInit(): void {
    this.postCreateForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      content: ['', [Validators.required]],
      authInfo: ['', [Validators.required]],
    });
  }
  onAddPost() {
    if (this.postCreateForm.valid) {
      const title = this.postCreateForm.get('title')?.value;
      const content = this.postCreateForm.get('content')?.value;
      const authInfo = this.postCreateForm.get('authInfo')?.value;

      this.http.post(`${environment.baseURL}/add-post`, { title, content, authInfo }).subscribe(
        (data: any) => {
          this.toastr.success('Post Created successfully');
          this.postCreateForm.reset();
        },
        (error: any) => {
          this.toastr.error(error.error?.message);
        }
      )
    }

  }
  OnLogOut(){
    this.sharedService.logOut();
  }

}
