import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditApiModalComponent } from './edit-api-modal.component';

describe('EditApiModalComponent', () => {
  let component: EditApiModalComponent;
  let fixture: ComponentFixture<EditApiModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditApiModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditApiModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
