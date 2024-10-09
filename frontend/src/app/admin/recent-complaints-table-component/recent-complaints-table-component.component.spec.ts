import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentComplaintsTableAdmin } from './recent-complaints-table-component.component';

describe('RecentComplaintsTableAdmin', () => {
  let component: RecentComplaintsTableAdmin;
  let fixture: ComponentFixture<RecentComplaintsTableAdmin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecentComplaintsTableAdmin]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecentComplaintsTableAdmin);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
