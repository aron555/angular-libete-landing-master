import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThumbingComponent } from './thumbing.component';

describe('ThumbingComponent', () => {
  let component: ThumbingComponent;
  let fixture: ComponentFixture<ThumbingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThumbingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThumbingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
