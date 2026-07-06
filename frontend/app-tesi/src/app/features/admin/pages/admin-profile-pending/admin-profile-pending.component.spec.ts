import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminProfilePendingComponent } from './admin-profile-pending.component';

describe('AdminProfilePendingComponent', () => {
  let component: AdminProfilePendingComponent;
  let fixture: ComponentFixture<AdminProfilePendingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminProfilePendingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminProfilePendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
