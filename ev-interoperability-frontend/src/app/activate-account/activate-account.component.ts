// activate-account.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user-service/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-activate-account',
  templateUrl: './activate-account.component.html',
  styleUrls: ['./activate-account.component.css'],
})
export class ActivateAccountComponent implements OnInit {
  activationMessage: string = '';
  activateForm: FormGroup;
  private activateToken!: string;
  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,

    private activateAccountService: UserService
  ) {
    this.activateForm = this.formBuilder.group({
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.activateToken = this.route.snapshot.params['token'];
  }

  activateAccount() {
    // Call the user service to activate the account
    const password = this.activateForm.get('password')!.value;

    this.activateAccountService
      .activateAccount(this.activateToken, password)
      .subscribe(
        (response) => {
          console.log(response); // Log success message
          // Optionally, you can navigate to another component or show a success message to the user
        },
        (error) => {
          console.error('Activation failed:', error);
          // Handle the error, e.g., show an error message to the user
        }
      );
  }

  // getUserByTk(): void {
  //   this.route.params.subscribe((params) => {
  //     const token = params['token'];
  //     if (token) {
  //       this.activateAccountService.getUserByToken(token).subscribe(
  //         (message) => {
  //           this.activationMessage = message;

  //           console.log(message);
  //         },
  //         (error) => {
  //           console.error('Activation failed:', error);
  //         }
  //       );
  //     } else {
  //     }
  //   });
  // }
}
