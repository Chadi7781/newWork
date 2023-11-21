// history.module.ts or app.module.ts (or the module where HistoryComponent is declared)
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HistoryComponent } from './history.component';

@NgModule({
  declarations: [
    HistoryComponent,
    // ... other components, directives, or pipes
  ],
  imports: [
    CommonModule, // Make sure to include CommonModule here
    // ... other modules
  ],
})
export class HistoryModule {}
