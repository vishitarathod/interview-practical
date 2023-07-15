import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {


  registerForm: FormGroup;

  constructor(private route: Router, private formBuilder: FormBuilder, private http: HttpClient, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      userName: ['', [Validators.required, Validators.email, Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}')]],
      password: ['', [Validators.required, Validators.minLength(4)]],
    });
  }
  onSubmit() {
    if (this.registerForm.valid) {
      const userName = this.registerForm.get('userName')?.value;
      const password = this.registerForm.get('password')?.value;
      this.http.post(`${environment.baseURL}/register`, { userName, password }).subscribe(
        (data: any) => {
          this.toastr.success('User Register successfully!', 'Success');
          this.route.navigate(['/auth']);
        },
        (error: any) => {
          this.toastr.error(error.error.message);
        }
      )
    }
  }
}
