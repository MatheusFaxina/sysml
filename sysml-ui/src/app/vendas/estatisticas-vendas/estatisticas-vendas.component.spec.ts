import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstatisticasVendasComponent } from './estatisticas-vendas.component';

describe('EstatisticasVendasComponent', () => {
  let component: EstatisticasVendasComponent;
  let fixture: ComponentFixture<EstatisticasVendasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstatisticasVendasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstatisticasVendasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
