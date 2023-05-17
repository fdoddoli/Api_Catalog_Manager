import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignedInLinksDevComponent } from './signed-in-links-dev.component';

describe('SignedInLinksDevComponent', () => {
  let component: SignedInLinksDevComponent;
  let fixture: ComponentFixture<SignedInLinksDevComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignedInLinksDevComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignedInLinksDevComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
