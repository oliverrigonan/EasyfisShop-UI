import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrForbiddenComponent } from './err-forbidden.component';

describe('ErrForbiddenComponent', () => {
  let component: ErrForbiddenComponent;
  let fixture: ComponentFixture<ErrForbiddenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ErrForbiddenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrForbiddenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
