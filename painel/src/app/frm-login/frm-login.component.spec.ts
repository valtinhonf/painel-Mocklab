import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrmLoginComponent } from './frm-login.component';

describe('FrmLoginComponent', () => {
  let component: FrmLoginComponent;
  let fixture: ComponentFixture<FrmLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FrmLoginComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FrmLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
