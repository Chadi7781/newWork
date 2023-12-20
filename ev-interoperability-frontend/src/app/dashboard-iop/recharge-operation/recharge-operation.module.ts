// recharge-operation.module.ts

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RechargeOperationComponent } from './recharge-operation.component';
import { DataTablesModule } from 'angular-datatables';

@NgModule({
  declarations: [RechargeOperationComponent],
  imports: [CommonModule, DataTablesModule],
})
export class RechargeOperationModule {}
