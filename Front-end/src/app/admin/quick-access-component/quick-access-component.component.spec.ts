import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickAccessAdmin } from './quick-access-component.component';

describe('QuickAccessAdmin', () => {
  let component: QuickAccessAdmin;
  let fixture: ComponentFixture<QuickAccessAdmin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuickAccessAdmin]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuickAccessAdmin);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
