import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  form: FormGroup;
  returnUrl: any;
  submitted: boolean;
  loading: boolean;
  users: any;
  roles = [
    'User',
    'Stuff',
    'Admin'
  ]
  userId: Number
  
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      firstName: ['', [ Validators.required]],
      secondName: ['', [ Validators.required]],
      title: ['', [ Validators.required]],
      email: ['', [ Validators.required, Validators.email]],
      role: ['', [ Validators.required]],
      password: ['', [ Validators.required]]
    });

    this.users = this.getUsers()

    this.userId = Number(this.route.snapshot.params['id']);

    if(this.users != null){

      const user = this.users.filter(item => item.id === this.userId);
      this.f.firstName.setValue(user.firstName)
      this.f.secondName.setValue(user.secondName)
      this.f.title.setValue(user.title)
      this.f.email.setValue(user.email)
      this.f.role.setValue(user.role)
    }
    

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/users';

  }

  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }

  onSubmit(): void {
    this.submitted = true;

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    // if (this.f.password.value != this.f.password.value){
    //   return;
    // }

    this.loading = true;

    // use the rest service here.
    const newUser = {
      firstName: this.f.firstName.value,
      secondName: this.f.secondName.value,
      title: this.f.title.value,
      email: this.f.email.value,
      role: this.f.role.value,
      password: this.f.password.value,
    };

    console.log(newUser)
    this.users = this.getUsers()

    if(this.users != null){
      this.users.push()
    }

  }

  // Get fresh Copy of Users
  getUsers(): object {
    return JSON.parse(localStorage.getItem('users'))
  }


}
