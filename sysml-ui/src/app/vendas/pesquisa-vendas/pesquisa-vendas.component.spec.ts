import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PesquisaVendasComponent } from './pesquisa-vendas.component';

describe('PesquisaVendasComponent', () => {
  let component: PesquisaVendasComponent;
  let fixture: ComponentFixture<PesquisaVendasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PesquisaVendasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PesquisaVendasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
