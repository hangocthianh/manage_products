import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-header',
  template: `
    <nav class="navbar navbar-expand-lg navbar-light bg-light px-5 py-3">
    <div class="logo" (click)="goToHome()">Manage Products</div>
      <div
        class="collapse navbar-collapse d-flex  justify-content-between"
        id="navbarSupportedContent"
      >
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <a class="nav-link" href="/home">List View</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/add-product">Add Product</a>
          </li>
        </ul>
        <button class="btn btn-outline-success my-2 my-sm-0" (click)="logout()">
          Logout
        </button>
      </div>
    </nav>
  `,
  styleUrls:['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  constructor(private router: Router, private auth: AuthService) {}

  ngOnInit() {}

  goToHome() {
    this.router.navigate(['home']);
  }
  logout() {
    this.auth.logout();
  }
}
