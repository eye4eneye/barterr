import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TradeLikelihoodCalculatorComponent } from './trade-likelihood-calculator.component';

describe('TradeLikelihoodCalculatorComponent', () => {
  let component: TradeLikelihoodCalculatorComponent;
  let fixture: ComponentFixture<TradeLikelihoodCalculatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TradeLikelihoodCalculatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TradeLikelihoodCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
