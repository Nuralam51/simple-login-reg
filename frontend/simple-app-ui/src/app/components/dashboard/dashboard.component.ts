import { Component, OnInit } from '@angular/core';
import { AuthUser } from 'src/app/common/AuthUser';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  currentUser: AuthUser;

  constructor() { }

  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem('userInfo'));
  }

}
