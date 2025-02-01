import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrmProjectComponent } from './frm-project.component';

describe('FrmProjectComponent', () => {
  let component: FrmProjectComponent;
  let fixture: ComponentFixture<FrmProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FrmProjectComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FrmProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
