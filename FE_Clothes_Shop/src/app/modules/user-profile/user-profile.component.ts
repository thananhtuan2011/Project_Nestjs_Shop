import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
    // setTimeout(() => {
    //   this.subheader.setTitle('User Profile');
    //   this.subheader.setBreadcrumbs([{
    //     title: 'User profile',
    //     linkText: 'User profile',
    //     linkPath: '/user-profile'
    //   }]);
    // }, 1);
  }
}
