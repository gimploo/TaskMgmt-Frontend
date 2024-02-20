import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupInviteModalComponent } from './group-invite-modal.component';

describe('GroupInviteModalComponent', () => {
  let component: GroupInviteModalComponent;
  let fixture: ComponentFixture<GroupInviteModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GroupInviteModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GroupInviteModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
