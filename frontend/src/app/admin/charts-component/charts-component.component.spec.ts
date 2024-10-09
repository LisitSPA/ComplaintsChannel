import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartsAdmin } from './charts-component.component';

describe('ChartsAdmin', () => {
  let component: ChartsAdmin;
  let fixture: ComponentFixture<ChartsAdmin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChartsAdmin]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChartsAdmin);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
