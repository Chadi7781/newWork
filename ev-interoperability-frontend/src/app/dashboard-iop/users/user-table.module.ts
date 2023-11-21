// user-table.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule

import { UserTableComponent } from './user-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon'; // Import MatIconModule
import { MatCardModule } from '@angular/material/card';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [UserTableComponent],
  imports: [
    MatTableModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatCardModule,
    CommonModule,
  ], // Make sure to include MatTableModule here

  exports: [UserTableComponent], // Export CommonModule
  // ... other module configuration
})
export class UserTableModule {}
