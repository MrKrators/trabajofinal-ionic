import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VerFacturasPage } from './ver-facturas.page';

describe('VerFacturasPage', () => {
  let component: VerFacturasPage;
  let fixture: ComponentFixture<VerFacturasPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(VerFacturasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
