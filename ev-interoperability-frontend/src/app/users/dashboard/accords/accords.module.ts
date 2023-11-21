// user-table.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule

import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon'; // Import MatIconModule
import { MatCardModule } from '@angular/material/card';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AccordsComponent } from './accords.component';

@NgModule({
  declarations: [AccordsComponent],
  imports: [
    MatTableModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatCardModule,
    CommonModule,
  ],

  exports: [AccordsComponent], // Export CommonModule
})
export class AccordsModule {}
