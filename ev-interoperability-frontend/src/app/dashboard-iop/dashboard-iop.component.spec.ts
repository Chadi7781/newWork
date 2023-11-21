import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardIopComponent } from './dashboard-iop.component';

describe('DashboardIopComponent', () => {
  let component: DashboardIopComponent;
  let fixture: ComponentFixture<DashboardIopComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardIopComponent]
    });
    fixture = TestBed.createComponent(DashboardIopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
