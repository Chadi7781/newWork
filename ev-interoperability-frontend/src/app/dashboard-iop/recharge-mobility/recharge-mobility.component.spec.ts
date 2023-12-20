import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RechargeMobilityComponent } from './recharge-mobility.component';

describe('RechargeMobilityComponent', () => {
  let component: RechargeMobilityComponent;
  let fixture: ComponentFixture<RechargeMobilityComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RechargeMobilityComponent]
    });
    fixture = TestBed.createComponent(RechargeMobilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
