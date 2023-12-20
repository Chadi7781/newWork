import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user-service/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-forgot-password',
  template: `
    <main>
      <div class="container">
        <section
          class="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4"
        >
          <div class="container">
            <div class="row justify-content-center">
              <div
                class="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center"
              >
                <div class="d-flex justify-content-center py-4">
                  <a
                    href="index.html"
                    class="logo d-flex align-items-center w-auto"
                  >
                    <img src="assets/img/logo.png" alt="" />
                    <span class="d-none d-lg-block"
                      >Interoperability Plateform</span
                    >
                  </a>
                </div>
                <!-- End Logo -->

                <div class="card mb-3">
                  <div class="card-body">
                    <div class="pt-4 pb-2">
                      <h5 class="card-title text-center pb-0 fs-4">
                        Forget Password
                      </h5>
                      <p class="text-center small">Enter your email</p>
                    </div>

                    <form
                      class="row g-3 needs-validation"
                      novalidate
                      (ngSubmit)="forgotPassword()"
                      [formGroup]="forgotForm"
                    >
                      <div class="col-12">
                        <label for="yourUsername" class="form-label"
                          >Email</label
                        >
                        <div class="input-group has-validation">
                          <input
                            type="text"
                            class="form-control"
                            id="email"
                            formControlName="email"
                            required
                          />
                          <div class="invalid-feedback">
                            Please enter your email.
                          </div>
                        </div>
                      </div>

                      <div class="col-12">
                        <button class="btn btn-primary w-100" type="submit">
                          Reset Password
                        </button>
                      </div>
                    </form>
                  </div>
                </div>

                <div class="credits">
                  <!-- All the links in the footer should remain intact. -->
                  <!-- You can delete the links only if you purchased the pro version. -->
                  <!-- Licensing information: https://bootstrapmade.com/license/ -->
                  <!-- Purchase the pro version with working PHP/AJAX contact form: https://bootstrapmade.com/nice-admin-bootstrap-admin-html-template/ -->
                  <!-- Designed by <a href="https://bootstrapmade.com/">BootstrapMade</a> -->
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  `,
})
export class ForgetPasswordComponent {
  email?: string;
  forgotForm: FormGroup;

  constructor(
    private authService: UserService,
    private formBuilder: FormBuilder,
    private toastr:ToastrService
  ) {
    this.forgotForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  forgotPassword() {
    const email = this.forgotForm.get('email')!.value;

    this.authService.forgotPassword(email).subscribe(
      (response) => {
        console.log(response);
        // Handle success, e.g., show a success message or redirect
        console.log('Password reset email sent successfully', response);
        this.toastr.info('Password reset email sent successfully');
      },
      (error) => {
        // Handle error, e.g., display an error message to the user
        console.error('Error sending password reset email', error);
                this.toastr.error('Error sending password reset email');

      }
    );
  }
}
