import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetOffresComponent } from './get-offres.component';

describe('GetOffresComponent', () => {
  let component: GetOffresComponent;
  let fixture: ComponentFixture<GetOffresComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GetOffresComponent]
    });
    fixture = TestBed.createComponent(GetOffresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
