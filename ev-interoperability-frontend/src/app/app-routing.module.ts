import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Import your components here
import { LoginComponent } from './login/login.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { DashboardIopComponent } from './dashboard-iop/dashboard-iop.component';
import { ActivateAccountComponent } from './activate-account/activate-account.component';
import { ContractsComponent } from './contracts-add/contracts.component';
import { DashboardComponent } from './users/dashboard/dashboard/dashboard.component';
import { MainComponent } from './main/main.component';
import { DashboardUsersComponent } from './users/dashboard/dashboard-users/dashboard-users.component';
import { HistoryComponent } from './dashboard-iop/history/history.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'contracts', component: ContractsComponent },
  { path: 'activate/:token', component: ActivateAccountComponent },

  { path: 'dashboard', component: DashboardIopComponent }, // Add this line for the dashboard
  { path: 'main', component: MainComponent }, // Add this line for the dashboard
  { path: 'list-users', component: DashboardComponent }, // Add this line for the dashboard
  { path: 'listAccords', component: DashboardUsersComponent }, // Add this line for the dashboard
  { path: 'histories', component: HistoryComponent }, // Add this line for the dashboard

  // Add more routes as needed
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Default route
];

@NgModule({
  imports: [RouterModule.forRoot(routes), CommonModule, HttpClientModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
