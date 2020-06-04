import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestTranslateModalComponent } from './test-translate-modal.component';

describe('TestTranslateModalComponent', () => {
  let component: TestTranslateModalComponent;
  let fixture: ComponentFixture<TestTranslateModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestTranslateModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestTranslateModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
