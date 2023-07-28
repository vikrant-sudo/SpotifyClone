import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TranslatorAppComponent } from './translator-app.component';

describe('TranslatorAppComponent', () => {
  let component: TranslatorAppComponent;
  let fixture: ComponentFixture<TranslatorAppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TranslatorAppComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TranslatorAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
