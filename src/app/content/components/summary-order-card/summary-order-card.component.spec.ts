import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryOrderCardComponent } from './summary-order-card.component';

describe('SummaryOrderCardComponent', () => {
  let component: SummaryOrderCardComponent;
  let fixture: ComponentFixture<SummaryOrderCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SummaryOrderCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SummaryOrderCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
