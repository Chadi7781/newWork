// main.module.ts
import { NgModule } from '@angular/core';
import { MainComponent } from './main.component'; // Assuming your main component is named MainComponent
import { UserTableModule } from '../users/user-table.module';
import { AccordsModule } from '../accords/accords.module';
import { PageHeaderModule } from '../shared';
import { MainRoutingModule } from './main-routing.module';

@NgModule({
    declarations: [MainComponent],
    imports: [UserTableModule, MainRoutingModule, AccordsModule, PageHeaderModule]
    // ... other module configuration
})
export class MainModule {}
