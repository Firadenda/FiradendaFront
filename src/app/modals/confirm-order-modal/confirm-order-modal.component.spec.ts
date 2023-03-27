import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmOrderModalComponent } from './confirm-order-modal.component';

describe('ConfirmOrderModalComponent', () => {
  let component: ConfirmOrderModalComponent;
  let fixture: ComponentFixture<ConfirmOrderModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmOrderModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmOrderModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
