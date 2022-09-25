import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShiftsHomeComponent } from './shifts-home.component';

fdescribe('ShiftsHomeComponent', () => {
  let component: ShiftsHomeComponent;
  let fixture: ComponentFixture<ShiftsHomeComponent>;
  let element: HTMLElement;


  beforeEach(() => {
    fixture = TestBed.createComponent(ShiftsHomeComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render correctly with two shifts', () => {
      const totalRenderedShifts = element.querySelectorAll(".shifts");
      expect(totalRenderedShifts.length).toEqual(2);
  }); 

});