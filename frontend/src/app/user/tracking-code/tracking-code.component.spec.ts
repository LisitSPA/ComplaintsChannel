import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackingCodeComponent } from './tracking-code.component';

describe('TrackingCodeComponent', () => {
  let component: TrackingCodeComponent;
  let fixture: ComponentFixture<TrackingCodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrackingCodeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrackingCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
