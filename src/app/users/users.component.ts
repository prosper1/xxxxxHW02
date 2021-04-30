import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogConfig , MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogOverviewExampleDialog } from '../delete-modal/delete-modal.component';
import { ActivatedRoute, Router } from '@angular/router';

export interface UserDetails {
  Name: string;
  Email: string;
  Role: string;
  Symbol: string;
}

export interface DialogData {
  animal: string;
  name: string;
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
  name: any;
  animal: any;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public matDialog: MatDialog,
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

  openDialog(id): void {
    const dialogRef = this.matDialog.open(DialogOverviewExampleDialog, {
      width: '250px',
      data: {id: id}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.reloadData()
      console.log(result)
    });
  }


  reloadData():void {
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

}
