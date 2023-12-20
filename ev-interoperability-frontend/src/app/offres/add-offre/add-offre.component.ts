import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Offre } from 'src/app/models/offre.model';
import { User } from 'src/app/models/user.model';
import { OffreService } from 'src/app/services/offre-service/offre.service';

@Component({
  selector: 'app-offre-form',
  templateUrl: './add-offre.component.html',
  styleUrls: ['./add-offre.component.css'],
})
export class AddOffreComponent implements OnInit {
  offreForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private offreService: OffreService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    // Initialize the form group with form controls and validators
    this.offreForm = this.fb.group({
      title: ['', Validators.required],
      label: ['', Validators.required],
      description: ['', Validators.required],
      status: ['', Validators.required],
      characteristics: ['', Validators.required],
      date: [null, Validators.required],
      offreLocation: ['', Validators.required],
      offreType: ['public', Validators.required],
    });
  }

  private getUser(): User | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
  addOffre() {
    const username = this.getUser()?.username;

    // Ensure the form is valid before submitting
    if (this.offreForm.valid) {
      const formData: Offre = this.offreForm.value;

      // Set other required fields for the Offre
      formData.characteristics = 'Some characteristics';
      formData.offreType = 'public'; // Set the type accordingly

      if (username) {
        this.offreService
          .createOffre(username, formData)
          .subscribe((newOffre) => {
            console.log('New Offre Added:', newOffre);
            this.toastr.success('offre added successfully!!');
          });
      }
    }
    window.location.reload();
  }
}
