import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvalidJsonComponent } from './invalid-json.component';

describe('InvalidJsonComponent', () => {
  let component: InvalidJsonComponent;
  let fixture: ComponentFixture<InvalidJsonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvalidJsonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvalidJsonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
