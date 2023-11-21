// main.module.ts
import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard.component';
import { UserTableModule } from 'src/app/dashboard-iop/users/user-table.module';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [DashboardComponent],
  imports: [UserTableModule, CommonModule],
})
export class DashboardModule {}
