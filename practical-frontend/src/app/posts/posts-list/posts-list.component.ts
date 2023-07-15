import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { SharedService } from 'src/app/shared/shared.service';
@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.css']
})
export class PostsListComponent implements OnInit {

  allPosts: any[] = [];
  constructor(private http: HttpClient, private toastr: ToastrService,private sharedService: SharedService) { }

  ngOnInit(): void {
    this.http.get(`${environment.baseURL}/list`).subscribe(
      (data: any) => {
        this.allPosts = data
      },
      (error: any) => {
        this.toastr.error(error.error.message);
      }
    )
  }
  OnLogOut(){
    this.sharedService.logOut();
  }

}
