import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user-service/user.service';

@Component({
  selector: 'app-reset-password',
  template: `
    <main class="main" id="main">
      <section class="section">
        <div class="container">
          <div class="row">
            <div style="width: 700px;">
              <div class="card">
                <div class="card-body">
                  <h5 class="card-title text-center">Reset Password</h5>

                  <!-- Reset Password Form -->
                  <form (ngSubmit)="resetPassword()" [formGroup]="passwordForm">
                    <div class="row mb-3">
                      <label for="yourUsername" class="col-sm-2 col-form-label">
                        password</label
                      >
                      <div class="col-sm-10">
                        <div class="input-group has-validation">
                          <input
                            type="password"
                            class="form-control"
                            id="password"
                            formControlName="password"
                            required
                          />
                          <div class="invalid-feedback">
                            Please enter your password.
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="row mb-3">
                      <div class="col-sm-10 offset-sm-2">
                        <button class="btn btn-primary w-100" type="submit">
                          Reset Password
                        </button>
                      </div>
                    </div>
                  </form>
                  <!-- End Reset Password Form -->
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  `,
})
export class ResetPasswordComponent implements OnInit {
  newPassword?: string;
  private resetToken!: string;
  passwordForm: FormGroup;

  constructor(
    private authService: UserService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.passwordForm = this.formBuilder.group({
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.resetToken = this.route.snapshot.params['token'];
  }

  resetPassword() {
    // Assuming you have the token from the route or some other source
    const token = this.resetToken;
    const password = this.passwordForm.get('password')!.value;
    console.log('pasword', password);
    console.log('token', token);

    this.authService.resetPassword(token, password!).subscribe(
      (response) => {
        // Handle success, e.g., show a success message or redirect
        console.log('Password reset successfully', response);
        this.toastr.success('Password reset successfully');
        this.router.navigate(['/g']);
      },
      (error) => {
        // Handle error, e.g., display an error message to the user
        console.error('Error resetting password', error);
        this.toastr.error('Error resetting password');
      }
    );
  }
}
