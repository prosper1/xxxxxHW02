import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

export interface UserDetails {
  Name: string;
  Email: string;
  Role: string;
  Symbol: string;
}




@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  dataSource = []
  dataMap = []
  displayedColumns: string[] = ['Name', 'Email', 'Role','Symbol'];
  users: any;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {

    // get user fresh copy
    this.users = this.getUsers()

    if(this.users != null){
      console.log(this.users)
      // Get User from Local Storage and sanitize it
      const userMap  = this.users.map(item => {
        this.dataMap.push(
          {
            'Name': item.firstName + ' ' + item.secondName,
            'Email': item.email,
            'Role': item.role,
            'Symbol': item.id,
          }
        )
      })

      const ELEMENT_DATA: UserDetails[] = this.dataMap;

      this.dataSource = ELEMENT_DATA;
      console.log(this.dataSource)
    }
     
  }

  // Get fresh Copy of Users
  getUsers(): object {
    return JSON.parse(localStorage.getItem('users'))
  }

  updateUser(id): void {
    this.router.navigate(['edit-user',id])
  }

  gotoAdd(): void {
    this.router.navigate(['add-user'])
  }

}
