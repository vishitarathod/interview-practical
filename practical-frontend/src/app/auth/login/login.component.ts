import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private route: Router, private formBuilder: FormBuilder, private http: HttpClient, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      userName: ['', [Validators.required, Validators.email, Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}')]],
      password: ['', [Validators.required, Validators.minLength(4)]],
    });
  }
  onSubmit() {
    if (this.loginForm.valid) {
      const userName = this.loginForm.get('userName')?.value;
      const password = this.loginForm.get('password')?.value;
      this.http.post(`${environment.baseURL}/login`, { userName, password }).subscribe(
        (data: any) => {
          localStorage.setItem("token", data.accessToken);
          this.toastr.success('Login successfully!');
          this.route.navigate(['/post']);
        },
        (error: any) => {
          this.toastr.error(error.error.message);
        }
      )
    }
  }

}
