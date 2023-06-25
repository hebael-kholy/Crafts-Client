import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
  FormsModule,
} from '@angular/forms';

import { Router } from '@angular/router';
import { faCalendarWeek } from '@fortawesome/free-solid-svg-icons';
import { LoginService } from 'src/app/Services/auth/auth.service';
import Swal from 'sweetalert2';

let one = 1;
let zero = 0;
export class User {
  userName!: string;
  password!: string;
  email!: string;
  gender!: number;
  //userId !:string;
}

export class wishlist {
  createdAt!: Date;
  userId!: string;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',

  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  errormsg: any;
  successmsg: any;
  user: User = new User();
  userForm!: FormGroup;
  gender = [
    { id: 0, value: 'male' },
    { id: 1, value: 'female' },
  ];
  constructor(
    private fb: FormBuilder,
    private apiservice: LoginService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userForm = this.fb.group({
      userName: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
        ],
      ],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          ),
        ],
      ],
      password: ['', [Validators.required, Validators.minLength(3)]],
      gender: [0, Validators.required],
    });
  }

  get username() {
    // return this.userForm.get('name');
    return this.userForm.controls['userName'].valid;
  }

  get email() {
    return this.userForm.get('email');
  }
  get password() {
    return this.userForm.get('password');
  }
  isLoading = false;
  onSubmit() {
    if (!this.userForm.valid) {
      return;
    }

    if (this.userForm.valid) {
      const data = {
        UserName: this.userForm.controls['userName'].value,
        Email: this.userForm.controls['email'].value,
        Password: this.userForm.controls['password'].value,
        Gender: +this.userForm.controls['gender'].value,
      };

      this.isLoading = true;
      console.log(data);
      this.apiservice.createUser(data).subscribe({
        next: (res) => {
          console.log(res, 'data submitted');
          this.user = res.user;
          this.userForm.reset();
          this.successmsg = res.message;
          Swal.fire('Thank You...', 'You Sumitted Successfully', 'success');
          console.log(typeof res.user.id);
          console.log(Date.now());
          console.log(res.user.id.toString());
          this.apiservice
            .CreatWishlist({
              createdAt: new Date().toJSON(),
              userId: res.user.id,
            })
            .subscribe({
              next: (res) => {
                console.log(res);
              },
              error: (err) => {
                console.log(err.message);
              },
            });
          this.apiservice
            .CreatCart({
              userId: res.user.id,
            })
            .subscribe({
              next: (res) => {
                console.log(res);
              },
              error: (err) => {
                console.log(err.message);
              },
            });
          console.log();
          this.isLoading = false;
          this.router.navigateByUrl('/login');
        },
        error: (err) => {
          console.log(err);
          this.isLoading = false;
          var emailErr = `Email '${this.user.email}' is already taken.`;
          var nameErr = `Username '${this.user.userName}' is already taken.`;
          var passDigit = `Passwords must have at least one digit ('0'-'9').`;

          console.log(this.user.userName);

          if (err.error[0].description == emailErr) {
            this.isLoading = false;
            Swal.fire({
              icon: 'warning',
              title: 'Email Already Exists!!!',
              showConfirmButton: true,
            });
          } else if (err.error[0].description == nameErr) {
            this.isLoading = false;
            Swal.fire({
              icon: 'warning',
              title: 'Name Already Exists!!!',
              showConfirmButton: true,
            });
          } else if (err.error[0].description == passDigit) {
            this.isLoading = false;
            Swal.fire({
              icon: 'warning',
              title: passDigit,
              showConfirmButton: true,
            });
          } else {
            Swal.fire({
              icon: 'warning',
              title: 'Something Went Wrong!!!',
              showConfirmButton: true,
            });
          }
        },
      });
    } else {
      this.isLoading = false;
      this.errormsg = 'All field required.';
    }
  }

  visible: boolean = true;
  changetype: boolean = true;

  viewpass() {
    this.visible = !this.visible;
    this.changetype = !this.changetype;
  }
}
