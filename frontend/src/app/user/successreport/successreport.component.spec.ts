import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessreportComponent } from './successreport.component';

describe('SuccessreportComponent', () => {
  let component: SuccessreportComponent;
  let fixture: ComponentFixture<SuccessreportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuccessreportComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuccessreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
