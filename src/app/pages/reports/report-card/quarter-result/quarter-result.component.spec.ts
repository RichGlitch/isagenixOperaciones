import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuarterResultComponent } from './quarter-result.component';

describe('QuarterResultComponent', () => {
  let component: QuarterResultComponent;
  let fixture: ComponentFixture<QuarterResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuarterResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuarterResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
