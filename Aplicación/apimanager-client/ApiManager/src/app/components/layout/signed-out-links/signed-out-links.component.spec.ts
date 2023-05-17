import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignedOutLinksComponent } from './signed-out-links.component';

describe('SignedOutLinksComponent', () => {
  let component: SignedOutLinksComponent;
  let fixture: ComponentFixture<SignedOutLinksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignedOutLinksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignedOutLinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
