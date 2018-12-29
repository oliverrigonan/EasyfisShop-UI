import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SysDashboardComponent } from './sys-dashboard.component';

describe('SysDashboardComponent', () => {
  let component: SysDashboardComponent;
  let fixture: ComponentFixture<SysDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SysDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SysDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
