import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenegComponent } from './meneg.component';

describe('MenegComponent', () => {
  let component: MenegComponent;
  let fixture: ComponentFixture<MenegComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenegComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenegComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
