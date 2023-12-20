// image-display.component.ts
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-image-display',
  template: '<img [src]="imageUrl" alt="Uploaded Image" *ngIf="imageUrl" />',
})
export class ImageDisplayComponent {
  @Input() imageUrl?: string;
}
