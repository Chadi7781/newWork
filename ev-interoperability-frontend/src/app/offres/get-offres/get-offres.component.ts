import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Offre } from 'src/app/models/offre.model';
import { User } from 'src/app/models/user.model';
import { OffreService } from 'src/app/services/offre-service/offre.service';

@Component({
  selector: 'app-get-offres',
  templateUrl: './get-offres.component.html',
  styleUrls: ['./get-offres.component.css'],
})
export class GetOffresComponent {
  offres: Offre[] = []; // Change 'any[]' to match the structure of your Offre model

  constructor(
    private route: ActivatedRoute,
    private offreService: OffreService
  ) {}

  ngOnInit(): void {
    const userId = this.route.snapshot.paramMap.get('userId');
    console.log(userId);
    if (userId) {
      this.fetchOffresByUser(userId); // Replace 'user-id' with the actual user ID
    } else {
      console.error('User ID is undefined');
      // Handle the case where userId is undefined
    }
  }

  private getUser(): User | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  fetchOffresByUser(userId: string): void {
    this.offreService.getOffresByUser(userId).subscribe(
      (response: { userOffers: Offre[] }) => {
        console.log('API Response:', response);
        this.offres = response.userOffers; // Access the userOffers property
      },
      (error) => {
        console.error('Error fetching offers:', error);
        // Handle errors
      }
    );
  }
}
