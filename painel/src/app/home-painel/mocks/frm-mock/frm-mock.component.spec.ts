import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrmMockComponent } from './frm-mock.component';

describe('FrmMockComponent', () => {
  let component: FrmMockComponent;
  let fixture: ComponentFixture<FrmMockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FrmMockComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FrmMockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
