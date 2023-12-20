// profile.component.ts

import { ChangeDetectorRef, Component, OnChanges, OnInit } from '@angular/core';
import { UserService } from '../services/user-service/user.service';
import { User } from '../models/user.model';
import { catchError, last, of, switchMap, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit, OnChanges {
  updateData: User | null = null;
  username: string | undefined = '';
  email: string | undefined = '';
  phone: string | undefined = '';
  country: string | undefined = '';
  address: string | undefined = '';
  about: string | undefined = '';

  uploadedFilename?: string;
  uploadedImages: string[] = [];

  constructor(
    private userService: UserService,
    private cdr: ChangeDetectorRef,
    private toastr: ToastrService
  ) {}

  ngOnChanges() {
    this.loadUploadedImages();
  }
  ngOnInit(): void {
    this.updateData = this.getUser();
    console.log(this.updateData);
    if (this.updateData) {
      this.username = this.updateData.username;
      this.phone = this.updateData.phone;
      this.email = this.updateData.email;
      this.country = this.updateData.country;
      this.about = this.updateData.about;
      this.address = this.updateData.address;
      this.myfile = this.updateData.file;
      console.log('my file', this.myfile);
      this.onGetPicture();
    }
    this.onGetPicture();
  }

  private getUser(): User | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
  file: File | undefined;
  myfile?: string;

  onFileSelected(event: any) {
    this.file = event.target.files[0];
    let user = this.getUser();
    console.log('Selected file:', this.file);

    const userId = user?._id;
    console.log('inside picture', localStorage.getItem('user'));
  }

  updateProfileInfo() {
    let user = this.getUser();
    const userId = user?._id;

    // Other data to update
    const formData = new FormData();
    formData.append('username', this.username ?? 'not mention');
    formData.append('email', this.email ?? 'not mention');
    formData.append('phone', this.phone ?? 'not mention');
    formData.append('country', this.country ?? 'not mention');
    formData.append('address', this.address ?? 'not mention');
    formData.append('about', this.about ?? 'not mention');

    if (this.file) {
      formData.append('file', this.file, this.file.name);
    }

    console.log(formData);

    // Use switchMap to chain the updateProfileInfo and updateProfilePicture calls
    this.userService
      .updateProfileInfo(userId!, formData)
      .pipe(
        switchMap((updatedUser) => {
          this.updateLocalUserData();

          return of(updatedUser);
        }),
        catchError((error) => {
          console.error('Error updating profile information', error);
          return throwError(error);
        })
      )
      .subscribe(
        (response) => {
          console.log(
            'Profile information and picture updated successfully',
            response
          );
          this.toastr.success(
            'Profile information and picture updated successfully'
          );

          window.location.reload();
        },
        (error) => {
          console.error(
            'Error updating profile information and picture',
            error
          );
        }
      );
  }
  async blobToDataURL(blob: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
        const dataURL = reader.result as string;
        resolve(dataURL);
      };

      reader.onerror = (error) => {
        reject(error);
      };

      reader.readAsDataURL(blob);
    });
  }

  async blobToString(blob: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
        const result = reader.result as string;
        resolve(result);
      };

      reader.onerror = (error) => {
        reject(error);
      };

      reader.readAsText(blob);
    });
  }
  pictureUrl?: string;

  onGetPicture(): void {
    console.log(this);
    this.userService.getUploadedImage(this.myfile!).subscribe((blob) => {
      const objectURL = URL.createObjectURL(blob);
      this.pictureUrl = objectURL;
    });
  }

  loadUploadedImages() {
    this.userService.getUploadedImage(this.myfile!).subscribe(
      (response: Blob) => {
        console.log(response); // Log the response to see if the data is received
        const imageUrl = URL.createObjectURL(response);
        this.uploadedFilename = imageUrl;
        this.cdr.detectChanges(); // Manually trigger change detection
        console.log(imageUrl);
      },
      (error) => {
        console.error('Error loading uploaded image:', error);
      }
    );
  }

  ////////////////////////////////
  private updateLocalUserData() {
    const updatedUserId = this.getUser()?._id;
    if (updatedUserId) {
      this.userService.getUserById(updatedUserId).subscribe(
        (updatedUser: any) => {
          localStorage.setItem('user', JSON.stringify(updatedUser));
          console.log(
            'Local storage updated with the new user data',
            updatedUser
          );
        },
        (error: any) => {
          console.error('Error fetching updated user data', error);
        }
      );
    }
  }
  loadUploadedImage(file: string) {
    this.userService.getUploadedImage(file).subscribe(
      (image) => {
        this.uploadedFilename = file;
        console.log(this.uploadedFilename);
      },
      (error) => {
        console.error('Error loading uploaded image:', error);
        // Handle errors
      }
    );
  }
}
