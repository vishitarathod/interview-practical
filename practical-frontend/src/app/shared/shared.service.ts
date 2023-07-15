import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(private route: Router) { }

  logOut() {
    localStorage.removeItem("token");
    this.route.navigate(['/auth']);
  }
}
