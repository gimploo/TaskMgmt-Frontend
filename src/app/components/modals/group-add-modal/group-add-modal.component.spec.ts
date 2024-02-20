import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupAddModalComponent } from './group-add-modal.component';

describe('GroupAddModalComponent', () => {
  let component: GroupAddModalComponent;
  let fixture: ComponentFixture<GroupAddModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GroupAddModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GroupAddModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
