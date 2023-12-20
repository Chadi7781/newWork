// user-table.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule

import { UserTableComponent } from './user-table.component';

@NgModule({
    declarations: [UserTableComponent],
    imports: [CommonModule], // Make sure to include MatTableModule here

    exports: [UserTableComponent] // Export CommonModule
    // ... other module configuration
})
export class UserTableModule {}
