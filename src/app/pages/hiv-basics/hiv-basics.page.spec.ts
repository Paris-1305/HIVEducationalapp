import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HivBasicsPage } from './hiv-basics.page';

describe('HivBasicsPage', () => {
  let component: HivBasicsPage;
  let fixture: ComponentFixture<HivBasicsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(HivBasicsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
