import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PnlListMocksComponent } from './pnl-list-mocks.component';

describe('PnlListMocksComponent', () => {
  let component: PnlListMocksComponent;
  let fixture: ComponentFixture<PnlListMocksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PnlListMocksComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PnlListMocksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
