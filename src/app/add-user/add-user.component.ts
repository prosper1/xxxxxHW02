import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
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

  titles = [
    'Mr',
    'Mrs',
    'Other'
  ]
  
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
      password: ['', [ Validators.required]],
      confirmPassword: ['', [Validators.required]]
    });
    

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/users';

  }

  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }

  onSubmit(): void {
    console.log('submitted' + this.f.role.value)
    this.submitted = true;
    const testUser = {
      firstName: this.f.firstName.value,
      secondName: this.f.secondName.value,
      title: this.f.title.value,
      email: this.f.email.value,
      role: this.f.role.value,
      password: this.f.password.value,
      confirmPassword: this.f.confirmPassword.value,

    };


    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    // validates password match and stop here.
    if (this.f.password.value != this.f.confirmPassword.value){
      return;
    }

    this.loading = true;

    // use the rest service here.
    const newUser = {
      id: Math.floor(Math.random() * 199999),
      firstName: this.f.firstName.value,
      secondName: this.f.secondName.value,
      title: this.f.title.value,
      email: this.f.email.value,
      role: this.f.role.value,
      password: this.f.password.value
    };

    // get user fresh copy
    this.users = this.getUsers()

    if(this.users != null){
      this.users.push(newUser)
      localStorage.setItem('users',JSON.stringify(this.users))
    }
    
    else{
      // if user storage doesnt exist, we set users
      localStorage.setItem('users',JSON.stringify([newUser]))
    }

   
    this.router.navigate(['users'])

  }

  // Get fresh Copy of Users
  getUsers(): object {
    return JSON.parse(localStorage.getItem('users'))
  }

}
