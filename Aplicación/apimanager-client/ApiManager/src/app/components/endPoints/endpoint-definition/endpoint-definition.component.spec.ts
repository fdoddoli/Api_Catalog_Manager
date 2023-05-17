import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EndpointDefinitionComponent } from './endpoint-definition.component';

describe('EndpointDefinitionComponent', () => {
  let component: EndpointDefinitionComponent;
  let fixture: ComponentFixture<EndpointDefinitionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EndpointDefinitionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EndpointDefinitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
