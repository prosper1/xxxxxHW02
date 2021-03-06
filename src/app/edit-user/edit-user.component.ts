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
    
    this.users = this.getUsers()

    this.userId = Number(this.route.snapshot.params['id']);
    
    if(this.users != null){
      const userFilter = this.users.filter(item => item.id === this.userId);
      const user = userFilter[0]
      this.form = this.formBuilder.group({
        firstName: [user.firstName, [ Validators.required]],
        secondName: [user.secondName, [ Validators.required]],
        title: [user.title, [ Validators.required]],
        email: [user.email, [ Validators.required, Validators.email]],
        role: [user.role, [ Validators.required]],
        password: [user.password, [ Validators.required]]
      });
      
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

    this.users = this.getUsers()

    const userFilter = this.users.filter(item => item.id === this.userId);
    const user = userFilter[0]

    const pos = this.users.indexOf(user);

    if (~pos) {
        this.users[pos] = {
          id: this.userId,
          firstName: this.f.firstName.value,
          secondName: this.f.secondName.value,
          title: this.f.title.value,
          email: this.f.email.value,
          role: this.f.role.value,
          password: this.f.password.value,
        };
    }

    

    localStorage.setItem('users',JSON.stringify(this.users))


    this.router.navigate(['users'])

  }

  // Get fresh Copy of Users
  getUsers(): object {
    return JSON.parse(localStorage.getItem('users'))
  }

  cancel(): void {
    this.router.navigate(['users'])
  }


}
