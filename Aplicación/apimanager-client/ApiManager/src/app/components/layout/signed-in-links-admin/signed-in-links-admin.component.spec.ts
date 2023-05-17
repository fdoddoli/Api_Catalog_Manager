import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignedInLinksAdminComponent } from './signed-in-links-admin.component';

describe('SignedInLinksAdminComponent', () => {
  let component: SignedInLinksAdminComponent;
  let fixture: ComponentFixture<SignedInLinksAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignedInLinksAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignedInLinksAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
