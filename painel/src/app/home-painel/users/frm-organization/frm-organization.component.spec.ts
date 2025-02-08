import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrmOrganizationComponent } from './frm-organization.component';

describe('FrmOrganizationComponent', () => {
  let component: FrmOrganizationComponent;
  let fixture: ComponentFixture<FrmOrganizationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FrmOrganizationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FrmOrganizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
