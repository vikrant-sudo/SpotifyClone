import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidJsonComponent } from './valid-json.component';

describe('ValidJsonComponent', () => {
  let component: ValidJsonComponent;
  let fixture: ComponentFixture<ValidJsonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValidJsonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ValidJsonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
