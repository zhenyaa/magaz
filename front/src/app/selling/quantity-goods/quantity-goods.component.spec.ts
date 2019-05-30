import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuantityGoodsComponent } from './quantity-goods.component';

describe('QuantityGoodsComponent', () => {
  let component: QuantityGoodsComponent;
  let fixture: ComponentFixture<QuantityGoodsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuantityGoodsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuantityGoodsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
