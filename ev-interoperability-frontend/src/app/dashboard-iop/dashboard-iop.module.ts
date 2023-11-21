import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivateAccountModule } from '../activate-account/activate-account.module';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { DashboardComponent } from '../users/dashboard/dashboard/dashboard.component';
import { ContractsComponent } from '../contracts-add/contracts.component';
import { ContractsModule } from '../contracts-add/contracts.module';
import { RouterModule } from '@angular/router';
import { DashboardIopComponent } from './dashboard-iop.component';
import { ActivateAccountComponent } from '../activate-account/activate-account.component';
import { MainComponent } from './main/main.component';
import { UserTableComponent } from './users/user-table.component';
import { CommonModule } from '@angular/common';
import { UserTableModule } from './users/user-table.module';
import { MatIconModule } from '@angular/material/icon';
import { HistoryComponent } from './history/history.component';

@NgModule({
  declarations: [
    HistoryComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    UserTableModule,
    CommonModule,
    ReactiveFormsModule,
    MatToolbarModule,

    MatSidenavModule,
    MatListModule,
    MatOptionModule,
    MatButtonModule,
    MatSnackBarModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatTableModule,
  ],
  providers: [],
  bootstrap: [DashboardIopComponent],
})
export class DashboardIopModule {}
