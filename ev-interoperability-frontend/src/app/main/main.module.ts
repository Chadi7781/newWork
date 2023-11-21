// main.module.ts
import { NgModule } from '@angular/core';
import { MainComponent } from './main.component'; // Assuming your main component is named MainComponent
import { UserTableModule } from '../dashboard-iop/users/user-table.module';
import { AccordsModule } from '../users/dashboard/accords/accords.module';

@NgModule({
  declarations: [MainComponent],
  imports: [UserTableModule, AccordsModule],
  // ... other module configuration
})
export class MainModule {}
