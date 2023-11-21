import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user-service/user.service';
import { SessionService } from '../services/session/session.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private sessionServ: SessionService,
    private cdr: ChangeDetectorRef,
    private toastr: ToastrService
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;

      // Call your NestJS backend for authentication
      this.userService.loginUser(username, password).subscribe(
        (res) => {
          if (res) {
            localStorage.setItem('user', JSON.stringify(res));

            this.sessionServ.setConnectivityStatus(true);

            // Authentication successful, navigate to home or dashboard
            if (res.role === 'iop') {
              this.toastr.success('login successfully!!');

              this.router.navigate(['/main']);
            } else if ((res.role = 'emsp')) {
              this.toastr.success('login successfully!!');

              this.router.navigate(['/dashboard']);
            } else if ((res.role = 'cpo')) {
              this.toastr.success('login successfully!!');

              this.router.navigate(['/dashboard']);
            }
          }
        },
        (error) => {
          // Handle authentication error (show error message, etc.)
          console.error('Authentication failed:', error);
          this.toastr.error('invalid username or password');
        }
      );
    }
  }
}
