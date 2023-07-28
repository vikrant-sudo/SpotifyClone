import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TranslationSuccessfullComponent } from './translation-successfull.component';

describe('TranslationSuccessfullComponent', () => {
  let component: TranslationSuccessfullComponent;
  let fixture: ComponentFixture<TranslationSuccessfullComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TranslationSuccessfullComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TranslationSuccessfullComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
