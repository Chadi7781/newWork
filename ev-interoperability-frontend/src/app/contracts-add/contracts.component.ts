import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user-service/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-contracts',
  templateUrl: './contracts.component.html',
  styleUrls: ['./contracts.component.css'],
})
export class ContractsComponent implements OnInit {
  contractForm!: FormGroup; // Remove the | undefined here

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private toastr: ToastrService
  ) {}

  onRoleChange(event: any): void {
    const selectedValue = event.target.value;
    this.contractForm.get('roles')?.setValue(selectedValue);
    console.log(this.contractForm.get('roles')?.value);
  }

  ngOnInit(): void {
    this.contractForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      roles: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.contractForm && this.contractForm.valid) {
      this.userService
        .registerUser(
          this.contractForm.value.username,
          this.contractForm.value.password,
          this.contractForm.value.email,
          this.contractForm.value.roles,
          '',
          '',
          '',
          '',
          ''
        )
        .subscribe(
          (response) => {
            // Store the token in local storage
            this.userService.setToken(response.token);
            console.log('Form submitted:', this.contractForm.value);
            this.toastr.success('Company added sucessfully');
            window.location.reload();
          },
          (error) => {
            console.error('Registration failed:', error);
          }
        );
    }
  }
}
