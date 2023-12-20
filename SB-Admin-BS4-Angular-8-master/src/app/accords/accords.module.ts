// user-table.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule

import { AccordsComponent } from './accords.component';

@NgModule({
    declarations: [AccordsComponent],
    imports: [CommonModule],

    exports: [AccordsComponent] // Export CommonModule
})
export class AccordsModule {}
