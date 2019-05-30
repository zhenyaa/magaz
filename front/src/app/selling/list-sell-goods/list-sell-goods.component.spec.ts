import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSellGoodsComponent } from './list-sell-goods.component';

describe('ListSellGoodsComponent', () => {
  let component: ListSellGoodsComponent;
  let fixture: ComponentFixture<ListSellGoodsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListSellGoodsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListSellGoodsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
