import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatAdminComponent } from './chat-admin.component';

describe('ChatAdminComponent', () => {
  let component: ChatAdminComponent;
  let fixture: ComponentFixture<ChatAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
