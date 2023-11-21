import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { AppRoutingModule } from './app-routing.module';
import { DashboardIopComponent } from './dashboard-iop/dashboard-iop.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { ContractsModule } from './contracts-add/contracts.module';
import { ContractsComponent } from './contracts-add/contracts.component';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ActivateAccountComponent } from './activate-account/activate-account.component';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { DashboardComponent } from './users/dashboard/dashboard/dashboard.component';
import { ActivateAccountModule } from './activate-account/activate-account.module';
import { DashboardModule } from './users/dashboard/dashboard/dashboard.module';
import { MatIconModule } from '@angular/material/icon';
import { AccordsComponent } from './users/dashboard/accords/accords.component';
import { MainModule } from './main/main.module';
import { DashboardUsersModule } from './users/dashboard/dashboard-users/dashboard-users.module';
import { ToastrModule } from 'ngx-toastr';
import { HistoryModule } from './dashboard-iop/history/history.module';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardIopComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    ContractsComponent,
    ActivateAccountComponent,
  ],
  imports: [
    BrowserModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    HistoryModule,
    MatSidenavModule,
    MatListModule,
    MatOptionModule,
    MatButtonModule,
    MatSnackBarModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatTableModule,
    MainModule,
    DashboardModule,
    DashboardUsersModule,
    MatIconModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
