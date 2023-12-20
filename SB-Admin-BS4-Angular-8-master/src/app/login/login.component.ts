// import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
// import { routerTransition } from '../router.animations';

import { ChangeDetectorRef, Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SessionService } from '../services/session/session.service';
import { UserService } from '../services/user-service/user.service';
import { routerTransition } from '../router.animations';

// @Component({
//     selector: 'app-login',
//     templateUrl: './login.component.html',
//     styleUrls: ['./login.component.scss'],
//     animations: [routerTransition()]
// })
// export class LoginComponent implements OnInit {
//     constructor(public router: Router) {}

//     ngOnInit() {}

//     onLoggedin() {
//         localStorage.setItem('isLoggedin', 'true');
//     }
// }

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: [routerTransition()]
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
            password: ['', Validators.required]
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

    onLoggedin() {
        localStorage.setItem('isLoggedin', 'true');
    }
}
