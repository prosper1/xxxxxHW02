import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.css']
})

export class DialogOverviewExampleDialog implements OnInit {
  users:any;
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data) {}

  ngOnInit() {
    this.users = this.getUsers()
  }

  Remove(id) {
    console.log()
    id = Number(id)
    const userFilter = this.users.filter(item => item.id != this.data.id);

   
   localStorage.setItem("users", JSON.stringify(userFilter));

   this.dialogRef.close([]);
  }

  Close():void{
    this.dialogRef.close()
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  // Get fresh Copy of Users
  getUsers(): object {
    return JSON.parse(localStorage.getItem('users'))
  }

}
