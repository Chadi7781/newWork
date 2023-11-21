// main.module.ts
import { NgModule } from '@angular/core';
import { UserTableModule } from 'src/app/dashboard-iop/users/user-table.module';
import { CommonModule } from '@angular/common';
import { DashboardUsersComponent } from './dashboard-users.component';
import { AccordsModule } from '../accords/accords.module';

@NgModule({
  declarations: [DashboardUsersComponent],
  imports: [AccordsModule, CommonModule],
})
export class DashboardUsersModule {}
