import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SysSoftwareLayoutComponent } from './sys-software-layout.component';

describe('SysSoftwareLayoutComponent', () => {
  let component: SysSoftwareLayoutComponent;
  let fixture: ComponentFixture<SysSoftwareLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SysSoftwareLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SysSoftwareLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
