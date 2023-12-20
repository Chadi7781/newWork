import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RechargeOperationComponent } from './recharge-operation.component';

describe('RechargeOperationComponent', () => {
  let component: RechargeOperationComponent;
  let fixture: ComponentFixture<RechargeOperationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RechargeOperationComponent]
    });
    fixture = TestBed.createComponent(RechargeOperationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
